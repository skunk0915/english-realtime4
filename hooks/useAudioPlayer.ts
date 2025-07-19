import { useState, useCallback } from 'react';
import { TTSResponse, SpeechError, AudioPlaybackOptions } from '@/lib/types/speech';

interface UseAudioPlayerReturn {
  isPlaying: boolean;
  currentSpeed: 'normal' | 'slow';
  error: SpeechError | null;
  play: (text: string, options?: AudioPlaybackOptions) => Promise<void>;
  stop: () => void;
  reset: () => void;
}

export const useAudioPlayer = (): UseAudioPlayerReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<'normal' | 'slow'>('normal');
  const [error, setError] = useState<SpeechError | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const play = useCallback(async (text: string, options: AudioPlaybackOptions = {}) => {
    const { speed = 'normal', volume = 1.0 } = options;
    
    if (isPlaying) {
      return;
    }

    setIsPlaying(true);
    setCurrentSpeed(speed);
    setError(null);

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
        throw new Error(`TTS API Error: ${response.status} ${response.statusText}`);
      }

      const data: TTSResponse = await response.json();
      
      if (!data.audioData) {
        throw new Error('音声データが取得できませんでした');
      }

      // Base64音声データをBlobに変換
      const binaryString = atob(data.audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBlob = new Blob([bytes], { type: data.mimeType });
      
      if (audioBlob.size === 0) {
        throw new Error('音声データが空です');
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // 音量設定
      audio.volume = Math.min(1, Math.max(0, volume));
      
      setCurrentAudio(audio);

      audio.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
        setIsPlaying(false);
        setCurrentAudio(null);
      });
      
      audio.addEventListener('error', (event) => {
        console.error('音声再生エラー:', event);
        URL.revokeObjectURL(audioUrl);
        setIsPlaying(false);
        setCurrentAudio(null);
        setError({
          type: 'synthesis',
          message: '音声の再生に失敗しました',
        });
      });

      // 音声の読み込み完了を待つ
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => reject(new Error('音声ファイルの読み込みに失敗しました'));
        audio.load();
      });

      await audio.play();
    } catch (err) {
      setIsPlaying(false);
      setCurrentAudio(null);
      
      const speechError: SpeechError = {
        type: 'synthesis',
        message: err instanceof Error ? err.message : '音声合成エラーが発生しました',
      };
      setError(speechError);
      throw speechError;
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setIsPlaying(false);
  }, [currentAudio]);

  const reset = useCallback(() => {
    stop();
    setError(null);
    setCurrentSpeed('normal');
  }, [stop]);

  return {
    isPlaying,
    currentSpeed,
    error,
    play,
    stop,
    reset,
  };
};