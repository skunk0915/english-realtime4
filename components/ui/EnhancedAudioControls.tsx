// =============================================================================
// 後方互換性のためのEnhancedAudioControlsラッパー - 統合コンポーネントを使用
// =============================================================================

import { EnhancedAudioControlsCompat } from './UnifiedAudioControls';

interface EnhancedAudioControlsProps {
  text: string;
  autoPlay?: boolean;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onError?: (error: Error) => void;
  className?: string;  
  showSlowSpeed?: boolean;
  disabled?: boolean;
  showAutoPlayFallback?: boolean;
}

/**
 * @deprecated EnhancedAudioControlsは非推奨です。UnifiedAudioControlsを使用してください。
 */
export const EnhancedAudioControls = (props: EnhancedAudioControlsProps) => {
  console.warn('EnhancedAudioControlsは非推奨です。UnifiedAudioControlsを使用してください。');
  
  return <EnhancedAudioControlsCompat {...props} />;
};