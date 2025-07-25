// =============================================================================
// 統合音声認識サービス - Web Speech APIの統合管理
// =============================================================================

import type {
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
  SpeechResult,
  SpeechError,
  SpeechOptions,
} from '@/lib/types/unified';
import { speechConfig } from '@/lib/config/unified';

// =============================================================================
// 音声認識サービスクラス
// =============================================================================

export class SpeechService {
  private recognition: SpeechRecognition | null = null;
  private isInitialized = false;
  private micPermissionGranted = false;
  private eventListeners = new Map<string, Set<(...args: any[]) => void>>();

  constructor() {
    this.initialize();
  }

  /**
   * 音声認識の初期化
   */
  private async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // ブラウザーサポートチェック
    if (!this.isSupported()) {
      throw this.createSpeechError(
        'speech_not_supported',
        'このブラウザーは音声認識をサポートしていません'
      );
    }

    // マイク許可をリクエスト
    try {
      await this.requestMicrophonePermission();
      this.micPermissionGranted = true;
    } catch (error) {
      throw this.createSpeechError(
        'speech_permission',
        'マイクへのアクセス許可が必要です',
        'PERMISSION_DENIED'
      );
    }

    // SpeechRecognitionインスタンスを作成
    this.createRecognitionInstance();
    this.isInitialized = true;
  }

  /**
   * ブラウザーサポートチェック
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' && 
           ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  /**
   * マイク許可リクエスト
   */
  private async requestMicrophonePermission(): Promise<void> {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('メディアデバイスAPIがサポートされていません');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // ストリームを停止(テスト目的のみ)
      stream.getTracks().forEach(track => track.stop());
      console.log('マイク許可を取得しました');
    } catch (error) {
      console.error('マイク許可エラー:', error);
      throw error;
    }
  }

  /**
   * SpeechRecognitionインスタンスを作成
   */
  private createRecognitionInstance(options: SpeechOptions = {}): void {
    const {
      lang = speechConfig.defaultLanguage,
      continuous = speechConfig.continuous,
      interimResults = speechConfig.interimResults,
    } = options;

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.recognition = new SpeechRecognition();

    // 基本設定
    this.recognition.lang = lang;
    this.recognition.continuous = continuous;
    this.recognition.interimResults = interimResults;

    // maxAlternatives設定(サポートされている場合)
    if ('maxAlternatives' in this.recognition) {
      (this.recognition as any).maxAlternatives = 1;
    }

    console.log('音声認識を初期化:', {
      lang: this.recognition.lang,
      continuous: this.recognition.continuous,
      interimResults: this.recognition.interimResults,
    });

    this.setupEventHandlers();
  }

  /**
   * イベントハンドラーの設定
   */
  private setupEventHandlers(): void {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      console.log('音声認識が開始されました');
      this.emit('start');
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log('音声認識結果:', event);
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result && result[0]) {
          const speechResult: SpeechResult = {
            transcript: result[0].transcript,
            confidence: result[0].confidence || 0,
            isFinal: result.isFinal,
            timestamp: new Date(),
          };

          console.log(`結果${i}:`, speechResult);
          
          if (result.isFinal) {
            this.emit('result', speechResult);
          } else {
            this.emit('interimResult', speechResult);
          }
        }
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('音声認識エラー:', event.error, event.message);
      
      const speechError = this.createSpeechError(
        'speech_recognition',
        `音声認識エラー: ${event.error} - ${event.message || '不明なエラー'}`,
        event.error
      );
      
      this.emit('error', speechError);
    };

    this.recognition.onend = () => {
      console.log('音声認識が終了しました');
      this.emit('end');
    };

    // オプショナルイベントの設定
    this.setupOptionalEventHandlers();
  }

  /**
   * オプショナルイベントハンドラーの設定
   */
  private setupOptionalEventHandlers(): void {
    if (!this.recognition) return;

    const optionalEvents = [
      'onaudiostart', 'onsoundstart', 'onspeechstart',
      'onspeechend', 'onsoundend', 'onaudioend', 'onnomatch'
    ];

    optionalEvents.forEach(eventName => {
      if (eventName in this.recognition!) {
        (this.recognition as any)[eventName] = () => {
          console.log(`音声認識イベント: ${eventName}`);
          this.emit(eventName.replace('on', ''));
        };
      }
    });
  }

  /**
   * 音声認識を開始
   */
  async startRecognition(options: SpeechOptions = {}): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.recognition) {
      throw this.createSpeechError(
        'speech_recognition',
        '音声認識が初期化されていません'
      );
    }

    // 新しいオプションがある場合は再作成
    if (Object.keys(options).length > 0) {
      this.createRecognitionInstance(options);
    }

    try {
      console.log('音声認識を開始します...');
      this.recognition.start();
    } catch (error) {
      throw this.createSpeechError(
        'speech_recognition',
        `音声認識の開始に失敗しました: ${error}`,
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  /**
   * 音声認識を停止
   */
  stopRecognition(): void {
    if (this.recognition) {
      console.log('音声認識を停止します...');
      this.recognition.stop();
    }
  }

  /**
   * 音声認識をリセット
   */
  async resetRecognition(): Promise<void> {
    console.log('音声認識をリセット中...');

    return new Promise<void>((resolve) => {
      if (!this.recognition) {
        resolve();
        return;
      }

      // タイムアウト付きonendイベントを待つ
      const timeoutId = setTimeout(() => {
        console.log('リセットタイムアウト、強制完了');
        resolve();
      }, speechConfig.timeout);

      // 一時的なonendハンドラーを設定
      const originalOnEnd = this.recognition.onend;
      this.recognition.onend = () => {
        clearTimeout(timeoutId);
        console.log('音声認識リセット完了');
        
        // 元のハンドラーを復元
        if (this.recognition) {
          this.recognition.onend = originalOnEnd;
        }
        
        setTimeout(resolve, 100); // ブラウザーの状態更新を待つ
      };

      try {
        this.recognition.abort();
      } catch (error) {
        console.warn('音声認識停止時のエラー:', error);
        clearTimeout(timeoutId);
        
        // ハンドラーを復元
        if (this.recognition) {
          this.recognition.onend = originalOnEnd;
        }
        
        resolve();
      }
    });
  }

  /**
   * リトライ機能付き音声認識開始
   */
  async startRecognitionWithRetry(
    options: SpeechOptions = {},
    maxRetries: number = speechConfig.retryAttempts
  ): Promise<void> {
    let lastError: SpeechError | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await this.startRecognition(options);
        return; // 成功したら終了
      } catch (error) {
        lastError = error instanceof Error ? 
          this.createSpeechError('speech_recognition', error.message) : 
          this.createSpeechError('speech_recognition', '不明なエラー');

        if (attempt < maxRetries) {
          console.warn(`音声認識リトライ ${attempt + 1}/${maxRetries}:`, lastError.message);
          
          // リセットしてから再試行
          await this.resetRecognition();
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
    }

    throw lastError || this.createSpeechError('speech_recognition', '音声認識に失敗しました');
  }

  /**
   * イベントリスナーを追加
   */
  on(event: string, listener: (...args: any[]) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(listener);
  }

  /**
   * イベントリスナーを削除
   */
  off(event: string, listener: (...args: any[]) => void): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  /**
   * イベントを発行
   */
  private emit(event: string, ...args: any[]): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(...args);
        } catch (error) {
          console.error(`イベントリスナーエラー (${event}):`, error);
        }
      });
    }
  }

  /**
   * 統一されたエラーオブジェクトを作成
   */
  private createSpeechError(
    type: SpeechError['type'],
    message: string,
    code?: string
  ): SpeechError {
    return {
      id: `speech_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: new Date(),
      recoverable: type !== 'speech_permission' && type !== 'speech_not_supported',
      ...(code !== undefined && { code }),
      context: {},
    };
  }

  /**
   * サービスのクリーンアップ
   */
  destroy(): void {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (error) {
        console.warn('音声認識破棄時のエラー:', error);
      }
      this.recognition = null;
    }
    
    this.eventListeners.clear();
    this.isInitialized = false;
    this.micPermissionGranted = false;
  }

  /**
   * サービスの状態情報を取得
   */
  getStatus() {
    return {
      isSupported: this.isSupported(),
      isInitialized: this.isInitialized,
      micPermissionGranted: this.micPermissionGranted,
      hasRecognition: this.recognition !== null,
    };
  }
}

// =============================================================================
// シングルトンインスタンス
// =============================================================================

// グローバルなシングルトンインスタンス
const speechService = new SpeechService();

// ブラウザーのアンロード時にクリーンアップ
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    speechService.destroy();
  });
}

export default speechService;

// コンポーネントで使いやすいように名前付きエクスポート
export { speechService };
