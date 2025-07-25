// =============================================================================
// 統合音声認識フック - useSpeechRecognitionの簡素化と統合
// =============================================================================

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  SpeechState,
  SpeechResult,
  SpeechError,
  SpeechOptions,
} from '@/lib/types/unified';
import speechService from '@/lib/services/speechService';

// =============================================================================
// フックオプション型
// =============================================================================

export interface UseSpeechOptions {
  lang?: string;
  continuous?: boolean;
  autoStart?: boolean;
  onResult?: (result: SpeechResult) => void;
  onInterimResult?: (result: SpeechResult) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: SpeechError) => void;
}

export interface UseSpeechReturn {
  state: SpeechState;
  start: () => void;
  stop: () => void;
  reset: () => Promise<void>;
  confirm: () => void;
  retry: () => void;
}

// =============================================================================
// 統合音声認識フック
// =============================================================================

export const useSpeech = (options: UseSpeechOptions = {}): UseSpeechReturn => {
  const {
    lang,
    continuous,
    autoStart = false,
    onResult,
    onInterimResult,
    onStart,
    onEnd,
    onError,
  } = options;

  // =============================================================================
  // 状態管理
  // =============================================================================

  const [state, setState] = useState<SpeechState>({
    phase: 'idle',
    transcript: '',
    confidence: 0,
    isListening: false,
    error: null,
    isSupported: speechService.isSupported(),
  });

  const hasStarted = useRef(false);
  const currentTranscript = useRef('');
  const isResetting = useRef(false);

  // =============================================================================
  // サービスイベントリスナー設定
  // =============================================================================

  useEffect(() => {
    // 開始イベント
    const handleStart = () => {
      setState(prev => ({
        ...prev,
        phase: 'listening',
        isListening: true,
        error: null,
      }));
      onStart?.();
    };

    // 結果イベント
    const handleResult = (result: SpeechResult) => {
      currentTranscript.current = result.transcript;
      
      setState(prev => ({
        ...prev,
        transcript: result.transcript,
        confidence: result.confidence,
        phase: result.isFinal ? 'confirming' : 'processing',
      }));

      if (result.isFinal) {
        onResult?.(result);
      } else {
        onInterimResult?.(result);
      }
    };

    // 中間結果イベント
    const handleInterimResult = (result: SpeechResult) => {
      setState(prev => ({
        ...prev,
        transcript: result.transcript,
        confidence: result.confidence,
        phase: 'processing',
      }));
      onInterimResult?.(result);
    };

    // 終了イベント
    const handleEnd = () => {
      if (!isResetting.current) {
        setState(prev => ({
          ...prev,
          isListening: false,
          phase: prev.transcript ? 'confirming' : 'idle',
        }));
      }
      onEnd?.();
    };

    // エラーイベント
    const handleError = (error: SpeechError) => {
      setState(prev => ({
        ...prev,
        isListening: false,
        phase: 'idle',
        error,
      }));
      onError?.(error);
    };

    // イベントリスナーを登録
    speechService.on('start', handleStart);
    speechService.on('result', handleResult);
    speechService.on('interimResult', handleInterimResult);
    speechService.on('end', handleEnd);
    speechService.on('error', handleError);

    return () => {
      // イベントリスナーを解除
      speechService.off('start', handleStart);
      speechService.off('result', handleResult);
      speechService.off('interimResult', handleInterimResult);
      speechService.off('end', handleEnd);
      speechService.off('error', handleError);
    };
  }, [onStart, onResult, onInterimResult, onEnd, onError]);

  // =============================================================================
  // 自動開始処理
  // =============================================================================

  useEffect(() => {
    if (autoStart && !hasStarted.current && state.isSupported) {
      hasStarted.current = true;
      // 少し遅延してから開始
      const timer = setTimeout(() => {
        start();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, state.isSupported]);

  // =============================================================================
  // 音声認識操作関数
  // =============================================================================

  const start = useCallback(() => {
    if (!state.isSupported) {
      const error: SpeechError = {
        id: `speech_error_${Date.now()}`,
        type: 'speech_not_supported',
        message: 'このブラウザーは音声認識をサポートしていません',
        timestamp: new Date(),
        recoverable: false,
      };
      setState(prev => ({ ...prev, error }));
      onError?.(error);
      return;
    }

    if (state.isListening) {
      console.warn('既に音声認識が実行中です');
      return;
    }

    const speechOptions: SpeechOptions = {
      lang,
      continuous,
    };

    speechService.startRecognitionWithRetry(speechOptions).catch((error) => {
      console.error('音声認識開始エラー:', error);
    });
  }, [state.isSupported, state.isListening, lang, continuous, onError]);

  const stop = useCallback(() => {
    if (!state.isListening) {
      return;
    }

    speechService.stopRecognition();
  }, [state.isListening]);

  const reset = useCallback(async () => {
    console.log('音声認識をリセット中...');
    
    isResetting.current = true;
    
    try {
      await speechService.resetRecognition();
      
      setState({
        phase: 'idle',
        transcript: '',
        confidence: 0,
        isListening: false,
        error: null,
        isSupported: speechService.isSupported(),
      });
      
      currentTranscript.current = '';
      hasStarted.current = false;
      
      console.log('音声認識リセット完了');
    } catch (error) {
      console.error('音声認識リセットエラー:', error);
    } finally {
      isResetting.current = false;
    }
  }, []);

  const confirm = useCallback(() => {
    if (state.phase === 'confirming' && currentTranscript.current) {
      const confirmedResult: SpeechResult = {
        transcript: currentTranscript.current,
        confidence: state.confidence,
        isFinal: true,
        timestamp: new Date(),
      };
      
      onResult?.(confirmedResult);
      
      // リセットして次の認識に備える
      setTimeout(() => {
        reset();
      }, 100);
    }
  }, [state.phase, state.confidence, onResult, reset]);

  const retry = useCallback(() => {
    reset().then(() => {
      // リセット後に再開始
      setTimeout(() => {
        start();
      }, 500);
    });
  }, [reset, start]);

  // =============================================================================
  // クリーンアップ
  // =============================================================================

  useEffect(() => {
    return () => {
      // コンポーネントアンマウント時のクリーンアップ
      if (state.isListening) {
        speechService.stopRecognition();
      }
    };
  }, [state.isListening]);

  // =============================================================================
  // フックの返却値
  // =============================================================================

  return {
    state,
    start,
    stop,
    reset,
    confirm,
    retry,
  };
};

// =============================================================================
// デフォルトエクスポート
// =============================================================================

export default useSpeech;
