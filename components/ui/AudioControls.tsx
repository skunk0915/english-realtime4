import { useState } from 'react';
import Button from './Button';

interface AudioControlsProps {
  text: string;
  onPlay?: () => void;
  className?: string;
  showSlowSpeed?: boolean;
  disabled?: boolean;
}

const AudioControls = ({ 
  text, 
  onPlay, 
  className = '',
  showSlowSpeed = true,
  disabled = false,
}: AudioControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<'normal' | 'slow'>('normal');

  const playAudio = async (speed: 'normal' | 'slow' = 'normal') => {
    if (disabled || isPlaying) return;
    
    setIsPlaying(true);
    setCurrentSpeed(speed);
    
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text, 
          speed: speed === 'slow' ? 0.7 : 1.0 
        }),
      });

      if (!response.ok) {
        throw new Error('音声合成に失敗しました');
      }

      const data = await response.json();
      
      if (!data.audioData) {
        throw new Error('音声データが取得できませんでした');
      }

      const binaryString = atob(data.audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBlob = new Blob([bytes], { type: data.mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
        setIsPlaying(false);
      });
      
      audio.addEventListener('error', () => {
        URL.revokeObjectURL(audioUrl);
        setIsPlaying(false);
      });

      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.load();
      });

      await audio.play();
      onPlay?.();
    } catch (error) {
      console.error('音声再生エラー:', error);
      setIsPlaying(false);
    }
  };

  const baseClasses = 'flex gap-2';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <Button
        size='sm'
        variant='primary'
        onClick={() => playAudio('normal')}
        disabled={disabled || isPlaying}
        loading={isPlaying && currentSpeed === 'normal'}
      >
        🔊 通常速度
      </Button>
      
      {showSlowSpeed && (
        <Button
          size='sm'
          variant='secondary'
          onClick={() => playAudio('slow')}
          disabled={disabled || isPlaying}
          loading={isPlaying && currentSpeed === 'slow'}
        >
          🔊 ゆっくり
        </Button>
      )}
    </div>
  );
};

export default AudioControls;