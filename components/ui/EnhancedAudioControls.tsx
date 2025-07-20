import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { useAudioCache } from '@/hooks/useAudioCache';

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

interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSpeed: 'normal' | 'slow';
  hasEnded: boolean;
  autoPlayBlocked: boolean;
}

export const EnhancedAudioControls = ({
  text,
  autoPlay = false,
  onPlayStart,
  onPlayEnd,
  onError,
  className = '',
  showSlowSpeed = true,
  disabled = false,
  showAutoPlayFallback = true,
}: EnhancedAudioControlsProps) => {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentSpeed: 'normal',
    hasEnded: false,
    autoPlayBlocked: false,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);
  const { getCachedAudio, setCachedAudio, clearCache } = useAudioCache();

  // ページ遷移時のクリーンアップ
  useEffect(() => {
    return () => {
      clearCache();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [clearCache]);

  // 音声キーの生成
  const generateAudioKey = (text: string, speed: 'normal' | 'slow'): string => {
    return `${text}_${speed}`;
  };

  // 音声データの取得またはキャッシュから取得
  const getAudioUrl = async (text: string, speed: 'normal' | 'slow'): Promise<string> => {
    const cacheKey = generateAudioKey(text, speed);
    
    // キャッシュから取得を試行
    const cachedUrl = getCachedAudio(cacheKey);
    if (cachedUrl) {
      return cachedUrl;
    }

    // API から新規取得
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        speed: speed === 'slow' ? 0.7 : 1.0,
      }),
    });

    if (!response.ok) {
      throw new Error(`TTS API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.audioData) {
      throw new Error('音声データが取得できませんでした');
    }

    // Base64をBlobに変換
    const binaryString = atob(data.audioData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const audioBlob = new Blob([bytes], { type: data.mimeType });
    
    // キャッシュに保存してURLを返す
    return setCachedAudio(cacheKey, audioBlob);
  };

  // 音声再生関数
  const playAudio = async (speed: 'normal' | 'slow' = 'normal', isAutoPlay = false) => {
    if (disabled || audioState.isPlaying) return;

    setAudioState(prev => ({ 
      ...prev, 
      isLoading: true, 
      currentSpeed: speed,
      autoPlayBlocked: false,
    }));

    try {
      // 既存の音声があれば停止
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audioUrl = await getAudioUrl(text, speed);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // イベントリスナーの設定
      audio.addEventListener('loadstart', () => {
        setAudioState(prev => ({ ...prev, isLoading: true }));
      });

      audio.addEventListener('canplaythrough', () => {
        setAudioState(prev => ({ ...prev, isLoading: false }));
      });

      audio.addEventListener('play', () => {
        setAudioState(prev => ({ ...prev, isPlaying: true, hasEnded: false }));
        onPlayStart?.();
      });

      audio.addEventListener('ended', () => {
        setAudioState(prev => ({ ...prev, isPlaying: false, hasEnded: true }));
        onPlayEnd?.();
      });

      audio.addEventListener('error', () => {
        const error = new Error('音声の再生に失敗しました');
        setAudioState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          isLoading: false,
          autoPlayBlocked: isAutoPlay,
        }));
        onError?.(error);
      });

      // 音声の読み込みと再生
      await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => reject(new Error('音声ファイルの読み込みに失敗しました'));
        audio.load();
      });

      await audio.play();
      
    } catch (error) {
      const audioError = error instanceof Error ? error : new Error('音声再生エラー');
      
      setAudioState(prev => ({ 
        ...prev, 
        isPlaying: false, 
        isLoading: false,
        autoPlayBlocked: isAutoPlay,
      }));
      
      onError?.(audioError);
      
      if (isAutoPlay) {
        console.log('自動再生がブロックされました:', audioError.message);
      }
    }
  };

  // 自動再生の実行
  useEffect(() => {
    if (autoPlay && !hasAutoPlayed.current && text.trim()) {
      hasAutoPlayed.current = true;
      // 少し遅延してから自動再生を試行
      const timer = setTimeout(() => {
        playAudio('normal', true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoPlay, text]);

  // 手動再生時の自動再生ブロック状態をリセット
  const handleManualPlay = (speed: 'normal' | 'slow') => {
    setAudioState(prev => ({ ...prev, autoPlayBlocked: false }));
    playAudio(speed, false);
  };

  const baseClasses = 'flex gap-2 items-center';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {/* 自動再生ブロック時の表示 */}
      {audioState.autoPlayBlocked && showAutoPlayFallback && (
        <div className="flex items-center gap-2 text-orange-600 text-sm">
          <span>🔇</span>
          <span>自動再生がブロックされました</span>
        </div>
      )}

      <Button
        size="sm"
        variant="primary"
        onClick={() => handleManualPlay('normal')}
        disabled={disabled}
        loading={audioState.isLoading && audioState.currentSpeed === 'normal'}
      >
        {audioState.isPlaying && audioState.currentSpeed === 'normal' ? (
          <>⏸️ 再生中</>
        ) : (
          <>🔊 通常速度</>
        )}
      </Button>

      {showSlowSpeed && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleManualPlay('slow')}
          disabled={disabled}
          loading={audioState.isLoading && audioState.currentSpeed === 'slow'}
        >
          {audioState.isPlaying && audioState.currentSpeed === 'slow' ? (
            <>⏸️ 再生中</>
          ) : (
            <>🔊 ゆっくり</>
          )}
        </Button>
      )}

      {/* 音声再生状態の表示 */}
      {audioState.isLoading && (
        <div className="flex items-center text-gray-500 text-xs">
          <div className="animate-spin rounded-full h-3 w-3 border-b border-gray-400 mr-1"></div>
          読み込み中...
        </div>
      )}
    </div>
  );
};