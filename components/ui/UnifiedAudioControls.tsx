// =============================================================================
// 統合音声コントロール - AudioControlsとEnhancedAudioControlsの統合
// =============================================================================

import { useEffect } from 'react';
import Button from './Button';
import useAudio, { UseAudioOptions } from '@/hooks/useAudio';

// =============================================================================
// コンポーネントプロップス型
// =============================================================================

export interface UnifiedAudioControlsProps {
  text: string;
  autoPlay?: boolean;
  showSlowSpeed?: boolean;
  onPlayStart?: (() => void) | undefined;
  onPlayEnd?: (() => void) | undefined;
  onError?: ((error: Error) => void) | undefined;
  className?: string;
  disabled?: boolean;
  showAutoPlayFallback?: boolean;
  cacheEnabled?: boolean;
}

// =============================================================================
// 統合音声コントロールコンポーネント
// =============================================================================

export const UnifiedAudioControls = ({
  text,
  autoPlay = false,
  showSlowSpeed = true,
  onPlayStart,
  onPlayEnd,
  onError,
  className = '',
  disabled = false,
  showAutoPlayFallback = true,
  cacheEnabled = true,
}: UnifiedAudioControlsProps) => {
  // =============================================================================
  // フックの初期化
  // =============================================================================

  const audioOptions: UseAudioOptions = {
    autoPlay,
    cacheEnabled,
    onPlayStart,
    onPlayEnd,
    onError: onError ? (audioError: any) => {
      // AudioErrorをErrorに変換してコールバック
      const error = new Error(audioError.message);
      error.name = audioError.type;
      onError(error);
    } : undefined,
  };

  const { state, play, stop, reset, clearCache, _handleAutoPlay } = useAudio(audioOptions) as any;

  // =============================================================================
  // 自動再生処理
  // =============================================================================

  useEffect(() => {
    if (_handleAutoPlay && text.trim()) {
      _handleAutoPlay(text);
    }
  }, [text, _handleAutoPlay]);

  // =============================================================================
  // イベントハンドラー
  // =============================================================================

  const handleManualPlay = (speed: 'normal' | 'slow') => {
    if (disabled || !text.trim()) {
      return;
    }
    
    play(text, speed).catch((error: any) => {
      console.error('手動音声再生エラー:', error);
    });
  };

  const handleStop = () => {
    stop();
  };

  const handleReset = () => {
    reset();
  };

  // =============================================================================
  // レンダリングヘルパー
  // =============================================================================

  const getButtonContent = (speed: 'normal' | 'slow') => {
    const isCurrentSpeed = state.currentSpeed === speed;
    const isLoadingForSpeed = state.isLoading && isCurrentSpeed;
    const isPlayingForSpeed = state.isPlaying && isCurrentSpeed;

    if (isLoadingForSpeed) {
      return speed === 'normal' ? '読み込み中...' : '読み込み中...';
    }

    if (isPlayingForSpeed) {
      return speed === 'normal' ? '⏸️ 再生中' : '⏸️ 再生中';
    }

    return speed === 'normal' ? '🔊 通常速度' : '🔊 ゆっくり';
  };

  const isButtonDisabled = (speed: 'normal' | 'slow') => {
    return disabled || state.isLoading || (state.isPlaying && state.currentSpeed !== speed);
  };

  const isButtonLoading = (speed: 'normal' | 'slow') => {
    return state.isLoading && state.currentSpeed === speed;
  };

  // =============================================================================
  // CSSクラスの生成
  // =============================================================================

  const baseClasses = 'flex gap-2 items-center';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  // =============================================================================
  // コンポーネントのレンダリング
  // =============================================================================

  return (
    <div className={classes}>
      {/* 自動再生ブロック時の警告表示 */}
      {state.autoPlayBlocked && showAutoPlayFallback && (
        <div className="flex items-center gap-2 text-orange-600 text-sm bg-orange-50 px-2 py-1 rounded">
          <span>🔇</span>
          <span>自動再生がブロックされました</span>
        </div>
      )}

      {/* エラー表示 */}
      {state.error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-2 py-1 rounded">
          <span>⚠️</span>
          <span>{state.error.message}</span>
          <button
            onClick={handleReset}
            className="text-red-700 hover:text-red-800 underline text-xs"
          >
            リセット
          </button>
        </div>
      )}

      {/* 通常速度ボタン */}
      <Button
        size="sm"
        variant="primary"
        onClick={() => handleManualPlay('normal')}
        disabled={isButtonDisabled('normal')}
        loading={isButtonLoading('normal')}
      >
        {getButtonContent('normal')}
      </Button>

      {/* スロー速度ボタン */}
      {showSlowSpeed && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleManualPlay('slow')}
          disabled={isButtonDisabled('slow')}
          loading={isButtonLoading('slow')}
        >
          {getButtonContent('slow')}
        </Button>
      )}

      {/* 停止ボタン(再生中のみ表示) */}
      {state.isPlaying && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleStop}
          disabled={disabled}
        >
          <span className="text-red-600">⏹️ 停止</span>
        </Button>
      )}

      {/* ローディングインジケーター */}
      {state.isLoading && (
        <div className="flex items-center text-gray-500 text-xs">
          <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400 mr-1"></div>
          <span>音声を生成中...</span>
        </div>
      )}

      {/* キャッシュ情報(開発モードのみ) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="flex items-center gap-1">
          <button
            onClick={clearCache}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
            title="キャッシュをクリア"
          >
            キャッシュクリア
          </button>
        </div>
      )}

      {/* 再生完了インジケーター */}
      {state.hasEnded && (
        <div className="flex items-center text-green-600 text-xs">
          <span>✓</span>
          <span className="ml-1">再生完了</span>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// デフォルトエクスポート
// =============================================================================

export default UnifiedAudioControls;

// =============================================================================
// ユーティリティコンポーネント
// =============================================================================

/**
 * シンプルな音声コントロール(後方互換性のため)
 */
export const SimpleAudioControls = ({
  text,
  onPlay,
  className = '',
  showSlowSpeed = true,
  disabled = false,
}: {
  text: string;
  onPlay?: () => void;
  className?: string;
  showSlowSpeed?: boolean;
  disabled?: boolean;
}) => {
  return (
    <UnifiedAudioControls
      text={text}
      onPlayStart={onPlay}
      className={className}
      showSlowSpeed={showSlowSpeed}
      disabled={disabled}
      autoPlay={false}
      showAutoPlayFallback={false}
    />
  );
};

/**
 * 自動再生対応音声コントロール(後方互換性のため)
 */
export const EnhancedAudioControlsCompat = ({
  text,
  autoPlay = false,
  onPlayStart,
  onPlayEnd,
  onError,
  className = '',
  showSlowSpeed = true,
  disabled = false,
  showAutoPlayFallback = true,
}: {
  text: string;
  autoPlay?: boolean;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  showSlowSpeed?: boolean;
  disabled?: boolean;
  showAutoPlayFallback?: boolean;
}) => {
  return (
    <UnifiedAudioControls
      text={text}
      autoPlay={autoPlay}
      onPlayStart={onPlayStart}
      onPlayEnd={onPlayEnd}
      onError={onError}
      className={className}
      showSlowSpeed={showSlowSpeed}
      disabled={disabled}
      showAutoPlayFallback={showAutoPlayFallback}
    />
  );
};
