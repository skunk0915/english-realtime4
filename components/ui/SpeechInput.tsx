import { useState, useEffect } from 'react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import Button from './Button';
import Card, { CardContent } from './Card';

interface SpeechInputProps {
  onConfirm: (transcript: string) => void;
  onCancel: () => void;
  onRetry?: () => void;
  placeholder?: string;
  isActive?: boolean;
  lang?: string;
  shouldStop?: boolean;
  autoStart?: boolean;
}

interface SpeechInputState {
  phase: 'idle' | 'listening' | 'processing' | 'confirming';
  transcript: string;
  interimTranscript: string;
  confidence: number;
  canRetry: boolean;
}

export const SpeechInput = ({
  onConfirm,
  onCancel,
  onRetry,
  placeholder = '話してください...',
  isActive = false,
  lang = 'en-US',
  shouldStop = false,
  autoStart = false,
}: SpeechInputProps) => {
  const [state, setState] = useState<SpeechInputState>({
    phase: 'idle',
    transcript: '',
    interimTranscript: '',
    confidence: 0,
    canRetry: false,
  });

  const {
    isListening,
    error,
    start,
    stop,
    reset,
  } = useSpeechRecognition({
    lang,
    continuous: true,
    interimResults: true,
    onResult: (text: string, conf: number) => {
      console.log('✅ 音声認識結果:', text, 'confidence:', conf);
      console.log('✅ 現在のフェーズ:', state.phase);
      setState(prev => ({
        ...prev,
        phase: 'confirming',
        transcript: text,
        interimTranscript: '',
        confidence: conf,
        canRetry: true,
      }));
    },
    onInterimResult: (text: string) => {
      console.log('中間認識結果:', text);
      setState(prev => ({
        ...prev,
        interimTranscript: text,
      }));
    },
    onEnd: () => {
      console.log('音声認識終了', 'phase:', state.phase, 'transcript:', state.transcript);
      // onResultで既に確認画面に移行している場合は何もしない
      if (state.phase === 'listening') {
        setState(prev => ({
          ...prev,
          phase: 'idle',
          canRetry: true,
        }));
      }
    },
    onError: (error) => {
      console.error('音声認識エラー:', error);
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

  // 外部からの停止信号を監視
  useEffect(() => {
    if (shouldStop && isListening) {
      console.log('外部信号により音声認識を停止');
      stop();
    }
  }, [shouldStop, isListening, stop]);

  // 自動開始を監視（エラー状態でない場合のみ）
  useEffect(() => {
    if (autoStart && isActive && state.phase === 'idle' && !isListening && !error) {
      console.log('自動で音声認識を開始');
      // 少し遅延させて確実に開始
      setTimeout(() => {
        if (state.phase === 'idle' && !isListening) {
          handleStartListening();
        }
      }, 100);
    }
  }, [autoStart, isActive, state.phase, isListening, error]);

  const handleStartListening = async () => {
    console.log('🎤 音声認識を開始します');
    await reset();
    setState({
      phase: 'idle',
      transcript: '',
      interimTranscript: '',
      confidence: 0,
      canRetry: false,
    });
    start();
  };

  const handleTestResult = () => {
    // テスト用の擬似的な認識結果
    setState(prev => ({
      ...prev,
      phase: 'confirming',
      transcript: 'Hello, how are you?',
      interimTranscript: '',
      confidence: 0.95,
      canRetry: true,
    }));
  };

  const handleForceResult = () => {
    // 強制的に認識結果を作成してコールバック
    const testText = 'I would like a table for two please';
    setState(prev => ({
      ...prev,
      phase: 'confirming',
      transcript: testText,
      interimTranscript: '',
      confidence: 0.9,
      canRetry: true,
    }));
    // 親コンポーネントに直接結果を送信
    onConfirm(testText);
  };

  const handleRetry = async () => {
    console.log('🔄 話し直しを開始');
    
    // まず音声認識を完全に停止（非同期で完了を待つ）
    await reset();
    
    // 状態をリセット
    setState({
      phase: 'idle',
      transcript: '',
      interimTranscript: '',
      confidence: 0,
      canRetry: false,
    });
    
    // 親コンポーネントにも話し直しを通知（タイマーリスタート用）
    console.log('🔄 話し直しでタイマーをリスタート');
    onRetry?.();
    
    // autoStartの機能に依存せず、直接開始
    setTimeout(async () => {
      console.log('🔄 話し直し用に音声認識を開始');
      await reset(); // 念のため再度リセット
      setState({
        phase: 'idle',
        transcript: '',
        interimTranscript: '',
        confidence: 0,
        canRetry: false,
      });
      start();
    }, 300);
  };

  const handleCancel = () => {
    reset();
    setState({
      phase: 'idle',
      transcript: '',
      interimTranscript: '',
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
        interimTranscript: '',
        confidence: 0,
        canRetry: false,
      });
    }
  };

  // 常に音声認識状況を表示
  return (
    <div className="space-y-4">
      {/* 音声認識状況パネル - 常に表示 */}
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">🎤 音声認識状況</h4>
        <div className="space-y-2 text-sm">
          <div>有効: <span className="font-mono">{isActive ? 'はい' : 'いいえ'}</span></div>
          <div>状態: <span className="font-mono">{state.phase}</span></div>
          <div>認識中: <span className="font-mono">{isListening ? 'はい' : 'いいえ'}</span></div>
          <div>中間結果: <span className="font-mono text-blue-600">{state.interimTranscript || '(なし)'}</span></div>
          <div>最終結果: <span className="font-mono text-green-600 font-bold">{state.transcript || '(なし)'}</span></div>
          <div>信頼度: <span className="font-mono">{state.confidence > 0 ? Math.round(state.confidence * 100) + '%' : '(なし)'}</span></div>
          <div>エラー: <span className="font-mono text-red-600">{error?.message || '(なし)'}</span></div>
        </div>
        
        {/* テストボタン */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            onClick={handleTestResult}
            variant="warning"
            size="sm"
          >
            🧪 テスト結果
          </Button>
          <Button
            onClick={handleForceResult}
            variant="primary"
            size="sm"
          >
            ✅ 強制送信
          </Button>
          <Button
            onClick={handleStartListening}
            variant="danger"
            size="sm"
          >
            🎤 手動開始
          </Button>
          <Button
            onClick={() => {
              reset();
              setState({
                phase: 'idle',
                transcript: '',
                interimTranscript: '',
                confidence: 0,
                canRetry: false,
              });
            }}
            variant="outline"
            size="sm"
          >
            🔄 リセット
          </Button>
        </div>
      </div>

      {/* isActiveがfalseの場合は以下は表示しない */}
      {!isActive && (
        <div className="text-center text-gray-600 p-4 bg-gray-50 rounded">
          音声入力が無効です（音声再生完了まで待機中）
        </div>
      )}

      {/* isActiveがtrueの場合のみ以下を表示 */}
      {isActive && (
        <>
          {/* 自動開始の場合の表示 */}
          {state.phase === 'idle' && autoStart && (
            <div className="text-center text-gray-600 p-4 bg-blue-50 rounded">
              音声認識の準備をしています...
            </div>
          )}

          {/* 手動開始の場合のボタン */}
          {state.phase === 'idle' && !autoStart && (
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
          )}
        </>
      )}

      {/* 録音状態表示 */}
      {state.phase === 'listening' && (
        <div className="text-center space-y-3">
          <div className="text-red-500 animate-pulse text-lg">
            🎤 録音中...
          </div>
          <p className="text-gray-600 text-sm">{placeholder}</p>
          
          {/* リアルタイム音声認識結果 */}
          {state.interimTranscript && (
            <div className="bg-blue-50 p-3 rounded border">
              <p className="text-blue-800 text-lg font-medium">
                📝 認識中: {state.interimTranscript}
              </p>
            </div>
          )}
          
          <div className="flex space-x-2 justify-center">
            <Button
              onClick={stop}
              variant="secondary"
              size="sm"
            >
              録音停止
            </Button>
            <Button
              onClick={() => {
                // 文字起こしをクリア
                setState(prev => ({
                  ...prev,
                  interimTranscript: '',
                  transcript: '',
                }));
              }}
              variant="warning"
              size="sm"
            >
              🗑️ クリア
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
            >
              ✕ 取消
            </Button>
          </div>
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
        <Card variant="bordered" className="border-green-200 bg-green-50">
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-green-800 mb-2 text-lg">
                ✅ 認識された音声:
              </h3>
              <p className="text-green-900 bg-white p-4 rounded text-lg font-medium border border-green-200">
                {state.transcript}
              </p>
              {state.confidence > 0 && (
                <p className="text-sm text-green-600 mt-2">
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