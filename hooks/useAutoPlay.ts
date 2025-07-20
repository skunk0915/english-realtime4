import { useEffect, useState, useRef } from 'react';

interface AutoPlayConfig {
  enabled: boolean;
  delay?: number;
  fallbackToUserAction: boolean;
}

interface AutoPlayReturn {
  canAutoPlay: boolean;
  hasTriedAutoPlay: boolean;
  requiresUserAction: boolean;
  enableAutoPlay: () => void;
  playAudio: (audioUrl: string) => Promise<void>;
}

export const useAutoPlay = (config: AutoPlayConfig): AutoPlayReturn => {
  const { enabled = true, delay = 500, fallbackToUserAction = true } = config;
  
  const [canAutoPlay, setCanAutoPlay] = useState(false);
  const [hasTriedAutoPlay, setHasTriedAutoPlay] = useState(false);
  const [requiresUserAction, setRequiresUserAction] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasUserInteracted = useRef(false);

  // ユーザーインタラクションの検知
  useEffect(() => {
    const handleUserInteraction = () => {
      hasUserInteracted.current = true;
      setCanAutoPlay(true);
      setRequiresUserAction(false);
      
      // イベントリスナーを削除
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    // ユーザーインタラクションのイベントリスナーを追加
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // 自動再生の有効化
  const enableAutoPlay = () => {
    setCanAutoPlay(true);
    setRequiresUserAction(false);
  };

  // 音声再生
  const playAudio = async (audioUrl: string): Promise<void> => {
    if (!enabled) return;

    try {
      // 既存の音声があれば停止
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      // 遅延実行
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // 自動再生を試行
      if (canAutoPlay || hasUserInteracted.current) {
        await audio.play();
        setHasTriedAutoPlay(true);
      } else {
        // 自動再生を試行してブロックされた場合のハンドリング
        try {
          await audio.play();
          setCanAutoPlay(true);
          setHasTriedAutoPlay(true);
        } catch (error) {
          console.log('自動再生がブロックされました:', error);
          setHasTriedAutoPlay(true);
          
          if (fallbackToUserAction) {
            setRequiresUserAction(true);
          }
        }
      }
    } catch (error) {
      console.error('音声再生エラー:', error);
      setHasTriedAutoPlay(true);
      
      if (fallbackToUserAction) {
        setRequiresUserAction(true);
      }
    }
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    canAutoPlay,
    hasTriedAutoPlay,
    requiresUserAction,
    enableAutoPlay,
    playAudio,
  };
};