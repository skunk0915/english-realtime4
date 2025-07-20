import { useState, useEffect } from 'react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Button } from './Button';
import { Card, CardContent } from './Card';

interface SpeechInputProps {
  onConfirm: (transcript: string) => void;
  onCancel: () => void;
  placeholder?: string;
  isActive?: boolean;
}

interface SpeechInputState {
  phase: 'idle' | 'listening' | 'processing' | 'confirming';
  transcript: string;
  confidence: number;
  canRetry: boolean;
}

export const SpeechInput = ({
  onConfirm,
  onCancel,
  placeholder = '話してください...',
  isActive = false,
}: SpeechInputProps) => {
  const [state, setState] = useState<SpeechInputState>({
    phase: 'idle',
    transcript: '',
    confidence: 0,
    canRetry: false,
  });

  const {
    isListening,
    transcript,
    confidence,
    error,
    start,
    stop,
    reset,
  } = useSpeechRecognition({
    onResult: (text: string, conf: number) => {
      setState(prev => ({
        ...prev,
        phase: 'confirming',
        transcript: text,
        confidence: conf,
        canRetry: true,
      }));
    },
    onEnd: () => {
      if (state.phase === 'listening') {
        setState(prev => ({
          ...prev,
          phase: 'processing',
        }));
      }
    },
    onError: () => {
      setState(prev => ({
        ...prev,
        phase: 'idle',
        canRetry: true,
      }));
    },
  });

  useEffect(() => {
    if (isListening) {
      setState(prev => ({
        ...prev,
        phase: 'listening',
      }));
    }
  }, [isListening]);

  const handleStartListening = () => {
    setState({
      phase: 'idle',
      transcript: '',
      confidence: 0,
      canRetry: false,
    });
    start();
  };

  const handleRetry = () => {
    reset();
    setState({
      phase: 'idle',
      transcript: '',
      confidence: 0,
      canRetry: false,
    });
    start();
  };

  const handleCancel = () => {
    reset();
    setState({
      phase: 'idle',
      transcript: '',
      confidence: 0,
      canRetry: false,
    });
    onCancel();
  };

  const handleConfirm = () => {
    if (state.transcript.trim()) {
      onConfirm(state.transcript);
      setState({
        phase: 'idle',
        transcript: '',
        confidence: 0,
        canRetry: false,
      });
    }
  };

  if (!isActive && state.phase === 'idle') {
    return (
      <div className="text-center">
        <Button
          onClick={handleStartListening}
          variant="danger"
          size="lg"
          className="rounded-full"
        >
          🎤 音声で応答
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 録音状態表示 */}
      {state.phase === 'listening' && (
        <div className="text-center space-y-3">
          <div className="text-red-500 animate-pulse text-lg">
            🎤 録音中...
          </div>
          <p className="text-gray-600 text-sm">{placeholder}</p>
          <Button
            onClick={stop}
            variant="secondary"
            size="sm"
          >
            録音停止
          </Button>
        </div>
      )}

      {/* 処理中表示 */}
      {state.phase === 'processing' && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">音声を処理中...</p>
        </div>
      )}

      {/* 確認画面 */}
      {state.phase === 'confirming' && state.transcript && (
        <Card variant="bordered">
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                認識された音声:
              </h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">
                {state.transcript}
              </p>
              {state.confidence > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  信頼度: {Math.round(state.confidence * 100)}%
                </p>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={handleConfirm}
                variant="primary"
                className="flex-1"
              >
                ✓ 確定
              </Button>
              <Button
                onClick={handleRetry}
                variant="secondary"
                className="flex-1"
              >
                🔄 話し直し
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="px-4"
              >
                ✕ 取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* エラー表示 */}
      {error && (
        <Card variant="bordered" className="border-red-200 bg-red-50">
          <CardContent>
            <p className="text-red-600 text-sm">
              {error.message}
            </p>
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              再試行
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};