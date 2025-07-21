import { useEffect, useRef, useState } from 'react';
import { SpeechRecognition, SpeechRecognitionEvent, SpeechError } from '@/lib/types/speech';

interface UseSpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, confidence: number) => void;
  onInterimResult?: (transcript: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: SpeechError) => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  confidence: number;
  error: SpeechError | null;
  isSupported: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useSpeechRecognition = (
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn => {
  const {
    lang = 'ja-JP',
    continuous = true,
    interimResults = true,
    onResult,
    onInterimResult,
    onStart,
    onEnd,
    onError,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<SpeechError | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const micPermissionRequested = useRef(false);
  
  const isSupported = typeof window !== 'undefined' && 
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) {
      setError({
        type: 'recognition',
        message: '音声認識がサポートされていません',
        code: 'NOT_SUPPORTED',
      });
      return;
    }

    // 既に初期化済みの場合はスキップ
    if (recognitionRef.current) {
      return;
    }

    // マイク許可をリクエスト（一度だけ）
    if (!micPermissionRequested.current) {
      micPermissionRequested.current = true;
      navigator.mediaDevices?.getUserMedia({ audio: true })
        .then(() => {
          console.log('マイク許可を取得しました');
        })
        .catch((err) => {
          console.error('マイク許可エラー:', err);
          setError({
            type: 'recognition',
            message: 'マイクへのアクセス許可が必要です',
            code: 'PERMISSION_DENIED',
          });
        });
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    
    // maxAlternativesは一部のブラウザでサポートされている
    if ('maxAlternatives' in recognition) {
      (recognition as any).maxAlternatives = 1;
    }
    
    console.log('🔧 音声認識を初期化:', {
      lang: recognition.lang,
      continuous: recognition.continuous,
      interimResults: recognition.interimResults
    });

    recognition.onstart = () => {
      console.log('🎙️ 音声認識が開始されました');
      setIsListening(true);
      setError(null);
      onStart?.();
    };

    // 一部のブラウザでサポートされているイベント
    if ('onaudiostart' in recognition) {
      (recognition as any).onaudiostart = () => {
        console.log('🔊 オーディオキャプチャが開始されました');
      };
    }

    if ('onsoundstart' in recognition) {
      (recognition as any).onsoundstart = () => {
        console.log('🎵 音声が検出されました');
      };
    }

    if ('onspeechstart' in recognition) {
      (recognition as any).onspeechstart = () => {
        console.log('🗣️ 発話が検出されました');
      };
    }

    if ('onspeechend' in recognition) {
      (recognition as any).onspeechend = () => {
        console.log('🔇 発話が終了しました');
      };
    }

    if ('onsoundend' in recognition) {
      (recognition as any).onsoundend = () => {
        console.log('🔇 音声が終了しました');
      };
    }

    if ('onaudioend' in recognition) {
      (recognition as any).onaudioend = () => {
        console.log('🔇 オーディオキャプチャが終了しました');
      };
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log('📝 音声認識イベント:', event);
      console.log('📝 結果の数:', event.results.length);
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result && result[0]) {
          const resultTranscript = result[0].transcript;
          const resultConfidence = result[0].confidence || 0;
          
          console.log(`📝 結果${i}: "${resultTranscript}" (isFinal: ${result.isFinal}, confidence: ${resultConfidence})`);
          
          setTranscript(resultTranscript);
          setConfidence(resultConfidence);
          
          if (result.isFinal) {
            console.log('✅ 最終結果をコールバック:', resultTranscript);
            onResult?.(resultTranscript, resultConfidence);
          } else {
            console.log('⏳ 中間結果をコールバック:', resultTranscript);
            onInterimResult?.(resultTranscript);
          }
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('❌ 音声認識エラー:', event.error, event.message);
      const speechError: SpeechError = {
        type: 'recognition',
        message: `音声認識エラー: ${event.error} - ${event.message || '不明なエラー'}`,
        code: event.error,
      };
      setError(speechError);
      setIsListening(false);
      onError?.(speechError);
    };

    recognition.onend = () => {
      console.log('🔚 音声認識が終了しました');
      setIsListening(false);
      onEnd?.();
    };

    if ('onnomatch' in recognition) {
      (recognition as any).onnomatch = () => {
        console.log('🚫 音声が認識されませんでした');
      };
    }

    // recognitionRefに設定
    recognitionRef.current = recognition;

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [isSupported]); // 依存配列を最小限に

  const start = () => {
    if (!recognitionRef.current) {
      console.error('❌ 音声認識が初期化されていません');
      return;
    }
    
    // 既に音声認識中の場合は無視
    if (isListening) {
      console.log('⚠️ 既に音声認識中です。開始要求を無視します。');
      return;
    }
    
    // 音声認識の状態をリセット
    setError(null);
    setTranscript('');
    setConfidence(0);
    
    try {
      console.log('🚀 音声認識を開始します...');
      console.log('🔧 認識設定:', {
        lang: recognitionRef.current.lang,
        continuous: recognitionRef.current.continuous,
        interimResults: recognitionRef.current.interimResults
      });
      
      // 開始前に状態を設定して重複開始を防ぐ
      setIsListening(true);
      recognitionRef.current.start();
    } catch (err) {
      console.error('❌ 音声認識開始エラー:', err);
      // エラーが発生した場合はisListeningをfalseに戻す
      setIsListening(false);
      
      const speechError: SpeechError = {
        type: 'recognition',
        message: `音声認識の開始に失敗しました: ${err}`,
      };
      setError(speechError);
      onError?.(speechError);
    }
  };

  const stop = () => {
    if (!recognitionRef.current || !isListening) return;
    
    recognitionRef.current.stop();
  };

  const reset = () => {
    console.log('🔄 音声認識をリセット中...');
    
    return new Promise<void>((resolve) => {
      // 先に状態を停止状態にする
      setIsListening(false);
      
      // 進行中の音声認識を停止
      if (recognitionRef.current) {
        console.log('🛑 進行中の音声認識を停止');
        
        // onendイベントハンドラーを一時的にオーバーライドして完了を検知
        const originalOnEnd = recognitionRef.current.onend;
        recognitionRef.current.onend = () => {
          // 状態をクリア
          setTranscript('');
          setConfidence(0);
          setError(null);
          
          console.log('✅ 音声認識リセット完了');
          
          // 元のハンドラーを復元
          if (recognitionRef.current) {
            recognitionRef.current.onend = originalOnEnd;
          }
          
          resolve();
        };
        
        try {
          recognitionRef.current.abort();
        } catch (err) {
          console.warn('🔄 音声認識停止時のエラー（通常は問題なし）:', err);
          // 状態をクリア
          setTranscript('');
          setConfidence(0);
          setError(null);
          
          // ハンドラーを復元
          if (recognitionRef.current) {
            recognitionRef.current.onend = originalOnEnd;
          }
          
          console.log('✅ 音声認識リセット完了');
          resolve();
        }
      } else {
        // 状態をクリア
        setTranscript('');
        setConfidence(0);
        setError(null);
        
        console.log('✅ 音声認識リセット完了');
        resolve();
      }
    });
  };

  return {
    isListening,
    transcript,
    confidence,
    error,
    isSupported,
    start,
    stop,
    reset,
  };
};