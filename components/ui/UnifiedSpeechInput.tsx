// =============================================================================
// 統合音声入力コンポーネント - useSpeechフックを使用した統合音声入力
// =============================================================================

import { useState } from 'react';
import Button from './Button';
import useSpeech, { UseSpeechOptions } from '@/hooks/useSpeech';
import type { SpeechResult, SpeechError } from '@/lib/types/unified';

// =============================================================================
// コンポーネントプロップス型
// =============================================================================

export interface UnifiedSpeechInputProps {
  onResult?: (transcript: string, confidence: number) => void;
  onError?: (error: SpeechError) => void;
  placeholder?: string | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
  autoStart?: boolean;
  continuous?: boolean;
  showConfirmation?: boolean;
  lang?: string;
  timeLimit?: number; // 制限時間（秒）
  onTimeUp?: (transcript: string) => void; // 制限時間切れ時のコールバック
  showTimer?: boolean; // タイマー表示
  showSampleAnswer?: boolean; // 回答例表示
  sampleAnswer?: string; // 回答例テキスト
  sampleAnswerJa?: string; // 日本語回答例
}

// =============================================================================
// 統合音声入力コンポーネント
// =============================================================================

export const UnifiedSpeechInput = ({
  onResult,
  onError,
  placeholder = '「録音」ボタンを押して話してください',
  className = '',
  disabled = false,
  autoStart = false,
  continuous = true,
  showConfirmation = true,
  lang = 'ja-JP',
  timeLimit,
  onTimeUp,
  showTimer = false,
  showSampleAnswer = false,
  sampleAnswer,
  sampleAnswerJa,
}: UnifiedSpeechInputProps) => {
  // =============================================================================
  // 状態管理
  // =============================================================================

  const [userInput, setUserInput] = useState('');
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showJaToggle, setShowJaToggle] = useState(false);

  // =============================================================================
  // 音声認識フックの初期化
  // =============================================================================

  const speechOptions: UseSpeechOptions = {
    lang,
    continuous,
    autoStart,
    ...(timeLimit !== undefined && { timeLimit }),
    onResult: (result: SpeechResult) => {
      console.log('音声認識結果:', result);
      
      if (result.isFinal) {
        setUserInput(result.transcript);
        setIsManualEdit(false);
        setIsTimeUp(false);
        
        if (!showConfirmation) {
          // 確認不要の場合はすぐにコールバック
          onResult?.(result.transcript, result.confidence);
        }
      }
    },
    onInterimResult: (result: SpeechResult) => {
      if (!isManualEdit) {
        setUserInput(result.transcript);
      }
    },
    onStart: () => {
      console.log('音声認識開始');
      setIsTimeUp(false);
    },
    onEnd: () => {
      console.log('音声認識終了');
    },
    onError: (error: SpeechError) => {
      console.error('音声認識エラー:', error);
      onError?.(error);
    },
    ...(onTimeUp && {
      onTimeUp: (currentTranscript: string) => {
        console.log('制限時間切れ:', currentTranscript);
        setIsTimeUp(true);
        setUserInput(currentTranscript);
        setIsManualEdit(false);
        onTimeUp(currentTranscript);
      }
    }),
  };

  const { state, timeLeft, start, stop, reset, confirm, retry } = useSpeech(speechOptions);

  // =============================================================================
  // イベントハンドラー
  // =============================================================================

  const handleStartRecording = () => {
    if (disabled || !state.isSupported) return;
    
    setUserInput('');
    setIsManualEdit(false);
    setIsTimeUp(false);
    start();
  };

  const handleStopRecording = () => {
    stop();
  };

  const handleConfirm = () => {
    if (userInput.trim()) {
      onResult?.(userInput.trim(), state.confidence);
      confirm();
    }
  };

  const handleRetry = () => {
    setUserInput('');
    setIsManualEdit(false);
    setIsTimeUp(false);
    retry();
  };

  const handleReset = () => {
    setUserInput('');
    setIsManualEdit(false);
    setIsTimeUp(false);
    reset();
  };

  const handleManualInput = (value: string) => {
    setUserInput(value);
    setIsManualEdit(true);
    
    if (state.isListening) {
      stop();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      if (state.phase === 'confirming' || isManualEdit) {
        handleConfirm();
      } else if (!state.isListening) {
        handleStartRecording();
      }
    }
  };

  // =============================================================================
  // UIヘルパー関数
  // =============================================================================

  const getStatusMessage = () => {
    if (!state.isSupported) {
      return 'このブラウザーは音声認識をサポートしていません';
    }
    
    if (isTimeUp) {
      return '⏰ 制限時間切れ - 音声入力結果を確認してください';
    }
    
    switch (state.phase) {
      case 'listening':
        return showTimer && timeLimit 
          ? `🎤 音声を認識中... (残り${timeLeft}秒)`
          : '🎤 音声を認識中...';
      case 'processing':
        return '🔄 処理中...';
      case 'confirming':
        return '✅ 確認してください';
      default:
        return placeholder;
    }
  };

  const getInputPlaceholder = () => {
    if (state.phase === 'listening') {
      return '話してください...';
    }
    if (state.phase === 'processing') {
      return '処理中...';
    }
    if (state.phase === 'confirming') {
      return '結果を確認してください';
    }
    return '手動入力または音声入力';
  };

  const getPrimaryButtonText = () => {
    if (state.isListening) {
      return '⏹️ 停止';
    }
    if (state.phase === 'confirming' || isTimeUp) {
      return '✅ 確定';
    }
    return '🎤 録音';
  };

  const getPrimaryButtonAction = () => {
    if (state.isListening) {
      return handleStopRecording;
    }
    if (state.phase === 'confirming' || isTimeUp) {
      return handleConfirm;
    }
    return handleStartRecording;
  };

  // =============================================================================
  // CSSクラスの生成
  // =============================================================================

  const containerClasses = [
    'space-y-3',
    className,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'w-full px-3 py-2 border rounded-md',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    state.phase === 'listening' ? 'border-red-300 bg-red-50' : '',
    state.phase === 'processing' ? 'border-yellow-300 bg-yellow-50' : '',
    state.phase === 'confirming' ? 'border-green-300 bg-green-50' : '',
    state.error ? 'border-red-500 bg-red-50' : 'border-gray-300',
    disabled ? 'bg-gray-100 cursor-not-allowed' : '',
  ].filter(Boolean).join(' ');

  // =============================================================================
  // コンポーネントのレンダリング
  // =============================================================================

  return (
    <div className={containerClasses}>
      {/* 状態メッセージ */}
      <div className="text-sm text-gray-600 text-center">
        {getStatusMessage()}
      </div>

      {/* エラー表示 */}
      {state.error && (
        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          <span>⚠️</span>
          <span>{state.error.message}</span>
          <button
            onClick={handleReset}
            className="ml-auto text-red-800 hover:text-red-900 underline text-xs"
          >
            リセット
          </button>
        </div>
      )}

      {/* テキスト入力エリア */}
      <div className="relative">
        <textarea
          value={userInput}
          onChange={(e) => handleManualInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={getInputPlaceholder()}
          className={inputClasses}
          disabled={disabled || !state.isSupported}
          rows={3}
        />
        
        {/* 信頼度表示 */}
        {state.confidence > 0 && !isManualEdit && (
          <div className="absolute top-2 right-2 text-xs text-gray-500">
            信頼度: {Math.round(state.confidence * 100)}%
          </div>
        )}
      </div>

      {/* コントロールボタン */}
      <div className="flex gap-2 justify-center">
        {/* メインアクションボタン */}
        <Button
          onClick={getPrimaryButtonAction()}
          disabled={disabled || !state.isSupported || (state.phase === 'confirming' && !userInput.trim())}
          variant={state.isListening ? 'outline' : 'primary'}
          size="sm"
        >
          {getPrimaryButtonText()}
        </Button>

        {/* リトライボタン */}
        {(state.phase === 'confirming' || state.error || isTimeUp) && (
          <Button
            onClick={handleRetry}
            disabled={disabled || !state.isSupported}
            variant="secondary"
            size="sm"
          >
            🔄 やり直し
          </Button>
        )}

        {/* リセットボタン */}
        {(userInput || state.phase !== 'idle') && (
          <Button
            onClick={handleReset}
            disabled={disabled}
            variant="outline"
            size="sm"
          >
            🗑️ クリア
          </Button>
        )}
      </div>

      {/* 手動入力時の確定ボタン */}
      {isManualEdit && userInput.trim() && showConfirmation && (
        <div className="text-center">
          <Button
            onClick={handleConfirm}
            disabled={disabled}
            variant="primary"
            size="sm"
          >
            ✅ 手動入力を確定
          </Button>
        </div>
      )}

      {/* 制限時間切れ時の確認メッセージ */}
      {isTimeUp && showConfirmation && (
        <div className="bg-orange-50 border border-orange-200 rounded p-3 space-y-3">
          <div className="text-orange-800 text-sm font-medium">
            ⏰ 制限時間が経過しました
          </div>
          <div className="text-gray-700 text-sm">
            現在の音声入力結果: <span className="font-medium">"{userInput || '（入力なし）'}"</span>
          </div>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={handleConfirm}
              disabled={disabled}
              variant="primary"
              size="sm"
            >
              ✅ この結果で確定
            </Button>
            <Button
              onClick={handleRetry}
              disabled={disabled || !state.isSupported}
              variant="secondary"
              size="sm"
            >
              🔄 やり直し
            </Button>
          </div>
        </div>
      )}

      {/* 回答例表示 */}
      {showSampleAnswer && (state.phase === 'confirming' || isTimeUp) && (sampleAnswer || sampleAnswerJa) && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 space-y-2">
          <div className="text-blue-800 text-sm font-medium">
            💡 回答例
          </div>
          {sampleAnswer && (
            <div className="text-gray-700 text-sm">
              <span className="font-medium">English:</span> {sampleAnswer}
            </div>
          )}
          {sampleAnswerJa && (
            <div className="text-gray-600 text-sm">
              <span className="font-medium">日本語:</span> 
              <span className={showJaToggle ? '' : 'hidden'}>
                {sampleAnswerJa}
              </span>
              <button
                onClick={() => setShowJaToggle(!showJaToggle)}
                className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
              >
                {showJaToggle ? '非表示' : '表示'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* デバッグ情報(開発モードのみ) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-400 text-center space-y-1">
          <div>フェーズ: {state.phase}</div>
          <div>サポート: {state.isSupported ? '✓' : '×'}</div>
          <div>言語: {lang}</div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// デフォルトエクスポート
// =============================================================================

export default UnifiedSpeechInput;

// =============================================================================
// 後方互換性ラッパー
// =============================================================================

/**
 * 既存のSpeechInputコンポーネントとの互換性を保つためのラッパー
 */
export const SpeechInputCompat = ({
  onResult,
  onError,
  placeholder,
  className,
  disabled,
}: {
  onResult?: (transcript: string) => void;
  onError?: (error: Error) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <UnifiedSpeechInput
      onResult={(transcript) => onResult?.(transcript)}
      onError={(speechError) => {
        const error = new Error(speechError.message);
        error.name = speechError.type;
        onError?.(error);
      }}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      showConfirmation={true}
      autoStart={false}
    />
  );
};

// =============================================================================
// 制限時間付き音声入力のラッパー
// =============================================================================

/**
 * 制限時間付き音声入力コンポーネント
 * 英語学習アプリ向けの設定済みバージョン
 */
export const TimedSpeechInput = ({
  timeLimit = 30,
  onResult,
  onTimeUp,
  onError,
  sampleAnswer,
  sampleAnswerJa,
  className,
  disabled,
}: {
  timeLimit?: number;
  onResult?: (transcript: string, confidence: number) => void;
  onTimeUp?: (transcript: string) => void;
  onError?: (error: SpeechError) => void;
  sampleAnswer?: string;
  sampleAnswerJa?: string;
  className?: string;
  disabled?: boolean;
}) => {
  const props: UnifiedSpeechInputProps = {
    timeLimit,
    showConfirmation: true,
    showTimer: true,
    showSampleAnswer: true,
    lang: "en-US", // 英語学習用
    autoStart: false,
    continuous: true,
    ...(onResult && { onResult }),
    ...(onTimeUp && { onTimeUp }),
    ...(onError && { onError }),
    ...(sampleAnswer && { sampleAnswer }),
    ...(sampleAnswerJa && { sampleAnswerJa }),
    ...(className && { className }),
    ...(disabled !== undefined && { disabled }),
  };

  return <UnifiedSpeechInput {...props} />;
};
