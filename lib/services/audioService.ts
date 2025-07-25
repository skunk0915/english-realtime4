// =============================================================================
// 統合音声サービス - TTS API呼び出しとキャッシュ管理の統合
// =============================================================================

import type {
  AudioBlob,
  TTSRequest,
  TTSResponse,
  AudioError,
  AudioOptions,
} from '@/lib/types/unified';
import { audioConfig } from '@/lib/config/unified';

// =============================================================================
// キャッシュ管理クラス
// =============================================================================

class AudioCacheManager {
  private cache = new Map<string, AudioBlob>();
  private cacheTimestamps = new Map<string, number>();
  private totalSize = 0;
  private readonly maxSize: number;
  private readonly ttl: number;

  constructor(maxSizeMB: number = audioConfig.cacheSize, ttlMinutes: number = audioConfig.cacheTTL) {
    this.maxSize = maxSizeMB * 1024 * 1024; // MB to bytes
    this.ttl = ttlMinutes * 60 * 1000; // minutes to ms
    
    // 定期的なクリーンアップ
    setInterval(() => this.cleanup(), 5 * 60 * 1000); // 5分ごと
  }

  /**
   * キャッシュキーの生成
   */
  private generateKey(text: string, speed: 'normal' | 'slow', language?: string): string {
    const lang = language || 'ja-JP';
    return `${text}_${speed}_${lang}`;
  }

  /**
   * キャッシュから音声データを取得
   */
  get(text: string, speed: 'normal' | 'slow', language?: string): AudioBlob | null {
    const key = this.generateKey(text, speed, language);
    const cached = this.cache.get(key);
    const timestamp = this.cacheTimestamps.get(key);
    
    if (cached && timestamp) {
      // TTLチェック
      if (Date.now() - timestamp > this.ttl) {
        this.delete(key);
        return null;
      }
      
      // アクセス時刻を更新(最近使用時刻を更新)
      this.cacheTimestamps.set(key, Date.now());
      return cached;
    }
    
    return null;
  }

  /**
   * キャッシュに音声データを保存
   */
  set(text: string, speed: 'normal' | 'slow', audioBlob: AudioBlob, language?: string): void {
    const key = this.generateKey(text, speed, language);
    
    // サイズチェック
    if (audioBlob.blob.size > this.maxSize) {
      console.warn('音声ファイルがキャッシュサイズ制限を超えています:', audioBlob.blob.size);
      return;
    }
    
    // キャッシュ容量チェックとクリーンアップ
    while (this.totalSize + audioBlob.blob.size > this.maxSize && this.cache.size > 0) {
      this.evictLRU();
    }
    
    this.cache.set(key, audioBlob);
    this.cacheTimestamps.set(key, Date.now());
    this.totalSize += audioBlob.blob.size;
  }

  /**
   * 最も古いエントリを削除(LRU)
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, timestamp] of this.cacheTimestamps) {
      if (timestamp < oldestTime) {
        oldestTime = timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  /**
   * 特定のキーを削除
   */
  private delete(key: string): void {
    const cached = this.cache.get(key);
    if (cached) {
      // URLをリボーク
      URL.revokeObjectURL(cached.url);
      this.totalSize -= cached.blob.size;
    }
    
    this.cache.delete(key);
    this.cacheTimestamps.delete(key);
  }

  /**
   * 期限切れエントリのクリーンアップ
   */
  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];
    
    for (const [key, timestamp] of this.cacheTimestamps) {
      if (now - timestamp > this.ttl) {
        expiredKeys.push(key);
      }
    }
    
    expiredKeys.forEach(key => this.delete(key));
    
    if (expiredKeys.length > 0) {
      console.log(`期限切れキャッシュを${expiredKeys.length}件削除しました`);
    }
  }

  /**
   * キャッシュをクリア
   */
  clear(): void {
    // 全てのURLをリボーク
    for (const cached of this.cache.values()) {
      URL.revokeObjectURL(cached.url);
    }
    
    this.cache.clear();
    this.cacheTimestamps.clear();
    this.totalSize = 0;
  }

  /**
   * キャッシュ統計情報を取得
   */
  getStats() {
    return {
      size: this.cache.size,
      totalSizeBytes: this.totalSize,
      totalSizeMB: Math.round(this.totalSize / 1024 / 1024 * 100) / 100,
      hitRate: 0, // 別途追跡が必要
    };
  }
}

// =============================================================================
// 統合音声サービスクラス
// =============================================================================

export class AudioService {
  private cache: AudioCacheManager;
  private requestCount = 0;
  private hitCount = 0;

  constructor() {
    this.cache = new AudioCacheManager();
  }

  /**
   * 音声データを生成またはキャッシュから取得
   */
  async generateAudio(
    text: string,
    options: AudioOptions = {}
  ): Promise<AudioBlob> {
    const { speed = 'normal', cacheEnabled = true } = options;
    
    this.requestCount++;
    
    // キャッシュから取得を試行
    if (cacheEnabled) {
      const cached = this.cache.get(text, speed);
      if (cached) {
        this.hitCount++;
        console.log('キャッシュヒット:', text.substring(0, 50));
        return cached;
      }
    }
    
    // APIから新規取得
    try {
      const audioBlob = await this.fetchFromTTSAPI(text, speed);
      
      // キャッシュに保存
      if (cacheEnabled) {
        this.cache.set(text, speed, audioBlob);
      }
      
      return audioBlob;
    } catch (error) {
      throw this.createAudioError(
        'tts_api',
        `TTS APIエラー: ${error instanceof Error ? error.message : '不明なエラー'}`,
        error
      );
    }
  }

  /**
   * TTS APIから音声データを取得
   */
  private async fetchFromTTSAPI(
    text: string,
    speed: 'normal' | 'slow'
  ): Promise<AudioBlob> {
    const request: TTSRequest = {
      text,
      speed: speed === 'slow' ? 0.7 : 1.0,
    };
    
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      audioConfig.timeout
    );
    
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: TTSResponse = await response.json();
      
      if (!data.audioData) {
        throw new Error('音声データが取得できませんでした');
      }
      
      return this.convertToAudioBlob(data);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`TTS APIタイムアウト (${audioConfig.timeout}ms)`);
      }
      
      throw error;
    }
  }

  /**
   * TTSResponseをAudioBlobに変換
   */
  private convertToAudioBlob(data: TTSResponse): AudioBlob {
    try {
      // Base64をBlobに変換
      const binaryString = atob(data.audioData);
      const bytes = new Uint8Array(binaryString.length);
      
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const blob = new Blob([bytes], { type: data.mimeType });
      
      if (blob.size === 0) {
        throw new Error('音声データが空です');
      }
      
      const url = URL.createObjectURL(blob);
      
      return {
        blob,
        url,
        mimeType: data.mimeType,
      };
    } catch (error) {
      throw new Error(
        `音声データの変換に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`
      );
    }
  }

  /**
   * 音声を再生
   */
  async playAudio(
    audioBlob: AudioBlob,
    options: AudioOptions = {}
  ): Promise<HTMLAudioElement> {
    const { volume = audioConfig.defaultVolume } = options;
    
    try {
      const audio = new Audio(audioBlob.url);
      audio.volume = Math.min(1, Math.max(0, volume));
      
      // 音声の読み込み完了を待つ
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => reject(new Error('音声ファイルの読み込みに失敗しました'));
        audio.load();
      });
      
      await audio.play();
      return audio;
    } catch (error) {
      throw this.createAudioError(
        'audio_play',
        `音声の再生に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
        error
      );
    }
  }

  /**
   * リトライ機能付き音声生成
   */
  async generateAudioWithRetry(
    text: string,
    options: AudioOptions = {},
    maxRetries: number = audioConfig.retryAttempts
  ): Promise<AudioBlob> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.generateAudio(text, options);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('不明なエラー');
        
        if (attempt < maxRetries) {
          console.warn(`音声生成リトライ ${attempt + 1}/${maxRetries}:`, lastError.message);
          // 指数バックオフで待機
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw lastError || new Error('音声生成に失敗しました');
  }

  /**
   * キャッシュをクリア
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * キャッシュ統計情報を取得
   */
  getCacheStats() {
    const stats = this.cache.getStats();
    return {
      ...stats,
      hitRate: this.requestCount > 0 ? this.hitCount / this.requestCount : 0,
      requestCount: this.requestCount,
      hitCount: this.hitCount,
    };
  }

  /**
   * 統一されたエラーオブジェクトを作成
   */
  private createAudioError(
    type: AudioError['type'],
    message: string,
    originalError?: unknown
  ): AudioError {
    return {
      id: `audio_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: new Date(),
      recoverable: type !== 'audio_permission',
      context: {
        originalError: originalError instanceof Error ? originalError.message : originalError,
      },
    };
  }

  /**
   * サービスのクリーンアップ
   */
  destroy(): void {
    this.clearCache();
  }
}

// =============================================================================
// シングルトンインスタンス
// =============================================================================

// グローバルなシングルトンインスタンス
const audioService = new AudioService();

// ブラウザーのアンロード時にクリーンアップ
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    audioService.destroy();
  });
}

export default audioService;

// コンポーネントで使いやすいように名前付きエクスポート
export { audioService };
export { AudioService };
