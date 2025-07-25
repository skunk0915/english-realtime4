// =============================================================================
// 後方互換性のためのAudioControlsラッパー - 統合コンポーネントを使用
// =============================================================================

import { SimpleAudioControls } from './UnifiedAudioControls';

interface AudioControlsProps {
  text: string;
  onPlay?: () => void;
  className?: string;
  showSlowSpeed?: boolean;
  disabled?: boolean;
}

/**
 * @deprecated AudioControlsは非推奨です。UnifiedAudioControlsまたはSimpleAudioControlsを使用してください。
 */
const AudioControls = (props: AudioControlsProps) => {
  console.warn('AudioControlsは非推奨です。UnifiedAudioControlsまたはSimpleAudioControlsを使用してください。');
  
  return <SimpleAudioControls {...props} />;
};

export default AudioControls;