// =============================================================================
// 統合音声フック - AudioControlsとEnhancedAudioControlsの機能統合
// =============================================================================

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  AudioState,
  AudioOptions,
  AudioError,
  AudioBlob,
} from '@/lib/types/unified';
import audioService from '@/lib/services/audioService';

// =============================================================================
// フックオプション型
// =============================================================================

export interface UseAudioOptions {
  autoPlay?: boolean;
  cacheEnabled?: boolean;
  onPlayStart?: (() => void) | undefined;
  onPlayEnd?: (() => void) | undefined;
  onError?: ((error: AudioError) => void) | undefined;
}

export interface UseAudioReturn {
  state: AudioState;
  play: (text: string, speed?: 'normal' | 'slow') => Promise<void>;
  stop: () => void;
  reset: () => void;
  clearCache: () => void;
}

// =============================================================================
// 統合音声フック
// =============================================================================

export const useAudio = (options: UseAudioOptions = {}): UseAudioReturn => {
  const {
    autoPlay = false,
    cacheEnabled = true,
    onPlayStart,
    onPlayEnd,
    onError,
  } = options;

  // =============================================================================
  // 状態管理
  // =============================================================================

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentSpeed: 'normal',
    hasEnded: false,
    error: null,
    autoPlayBlocked: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);
  const currentText = useRef<string>('');

  // =============================================================================
  // クリーンアップ処理
  // =============================================================================

  useEffect(() => {
    return () => {
      // コンポーネントアンマウント時のクリーンアップ
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // =============================================================================
  // 音声再生関数
  // =============================================================================

  const play = useCallback(async (
    text: string,
    speed: 'normal' | 'slow' = 'normal',
    isAutoPlay = false
  ) => {
    // 既に再生中の場合はスキップ
    if (state.isPlaying) {
      console.warn('既に音声が再生中です');
      return;
    }

    // テキストが空の場合はスキップ
    if (!text.trim()) {
      console.warn('音声再生用のテキストが空です');
      return;
    }

    currentText.current = text;

    // 状態を読み込み中に更新
    setState(prev => ({
      ...prev,
      isLoading: true,
      currentSpeed: speed,
      error: null,
      autoPlayBlocked: false,
    }));

    try {
      // 既存の音声を停止
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // 音声データを取得
      const audioOptions: AudioOptions = {
        speed,
        cacheEnabled,
      };

      const audioBlob: AudioBlob = await audioService.generateAudioWithRetry(
        text,
        audioOptions
      );

      // テキストが変更された場合は中断
      if (currentText.current !== text) {
        console.log('音声生成中にテキストが変更されました');
        return;
      }

      // Audioエレメントを作成
      const audio = new Audio(audioBlob.url);
      audioRef.current = audio;

      // イベントリスナーを設定
      setupAudioEventListeners(audio, isAutoPlay);

      // 読み込み完了を待つ
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => {
          setState(prev => ({ ...prev, isLoading: false }));
          resolve();
        };
        audio.onerror = () => {
          reject(new Error('音声ファイルの読み込みに失敗しました'));
        };
        audio.load();
      });

      // テキストが変更された場合は中断
      if (currentText.current !== text) {
        console.log('音声読み込み中にテキストが変更されました');
        return;
      }

      // 音声を再生
      await audio.play();
      
    } catch (error) {
      console.error('音声再生エラー:', error);
      
      const audioError: AudioError = {
        id: `audio_error_${Date.now()}`,
        type: 'audio_play',
        message: error instanceof Error ? error.message : '音声再生エラー',
        timestamp: new Date(),
        recoverable: true,
        context: { isAutoPlay, text: text.substring(0, 50) },
      };

      setState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: audioError,
        autoPlayBlocked: isAutoPlay,
      }));

      // エラーコールバックを実行
      onError?.(audioError);

      // 自動再生の場合はエラーをスローしない
      if (!isAutoPlay) {
        throw audioError;
      }
    }
  }, [state.isPlaying, cacheEnabled, onError]);

  // =============================================================================
  // 音声イベントハンドラー設定
  // =============================================================================

  const setupAudioEventListeners = useCallback((
    audio: HTMLAudioElement,
    isAutoPlay: boolean
  ) => {
    audio.addEventListener('play', () => {
      setState(prev => ({
        ...prev,
        isPlaying: true,
        hasEnded: false,
        error: null,
      }));
      onPlayStart?.();
    });

    audio.addEventListener('ended', () => {
      setState(prev => ({
        ...prev,
        isPlaying: false,
        hasEnded: true,
      }));
      onPlayEnd?.();
      audioRef.current = null;
    });

    audio.addEventListener('error', () => {
      const audioError: AudioError = {
        id: `audio_error_${Date.now()}`,
        type: 'audio_play',
        message: '音声の再生に失敗しました',
        timestamp: new Date(),
        recoverable: true,
        context: { isAutoPlay },
      };

      setState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: audioError,
        autoPlayBlocked: isAutoPlay,
      }));

      onError?.(audioError);
      audioRef.current = null;
    });
  }, [onPlayStart, onPlayEnd, onError]);

  // =============================================================================
  // 自動再生処理
  // =============================================================================

  const handleAutoPlay = useCallback(async (text: string) => {
    if (!autoPlay || hasAutoPlayed.current || !text.trim()) {
      return;
    }

    hasAutoPlayed.current = true;
    
    // 少し遅延してから自動再生を試行
    setTimeout(() => {
      play(text, 'normal', true).catch(() => {
        // 自動再生の失敗はサイレントに処理
        console.log('自動再生がブロックされました');
      });
    }, 500);
  }, [autoPlay, play]);

  // =============================================================================
  // その他の操作関数
  // =============================================================================

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isPlaying: false,
      isLoading: false,
    }));
  }, []);

  const reset = useCallback(() => {
    stop();
    setState({
      isPlaying: false,
      isLoading: false,
      currentSpeed: 'normal',
      hasEnded: false,
      error: null,
      autoPlayBlocked: false,
    });
    hasAutoPlayed.current = false;
    currentText.current = '';
  }, [stop]);

  const clearCache = useCallback(() => {
    audioService.clearCache();
  }, []);

  // =============================================================================
  // 手動再生用のラッパー関数
  // =============================================================================

  const playManual = useCallback((
    text: string,
    speed: 'normal' | 'slow' = 'normal'
  ) => {
    // 手動再生時は自動再生ブロック状態をリセット
    setState(prev => ({ ...prev, autoPlayBlocked: false }));
    return play(text, speed, false);
  }, [play]);

  // =============================================================================
  // フックの返却値
  // =============================================================================

  return {
    state,
    play: playManual,
    stop,
    reset,
    clearCache,
    // 内部用の自動再生関数
    _handleAutoPlay: handleAutoPlay,
  } as UseAudioReturn & { _handleAutoPlay: (text: string) => Promise<void> };
};

// =============================================================================
// デフォルトエクスポート
// =============================================================================

export default useAudio;
