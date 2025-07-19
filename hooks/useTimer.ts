import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  initialTime: number;
  onTimeUp?: () => void;
  onTick?: (timeLeft: number) => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  timeLeft: number;
  isActive: boolean;
  isExpired: boolean;
  start: () => void;
  stop: () => void;
  reset: (newTime?: number) => void;
  restart: (newTime?: number) => void;
}

export const useTimer = (options: UseTimerOptions): UseTimerReturn => {
  const { initialTime, onTimeUp, onTick, autoStart = false } = options;
  
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  const [isExpired, setIsExpired] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsActive(true);
    setIsExpired(false);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback((newTime?: number) => {
    const resetTime = newTime ?? initialTime;
    setTimeLeft(resetTime);
    setIsExpired(false);
    stop();
  }, [initialTime, stop]);

  const restart = useCallback((newTime?: number) => {
    reset(newTime);
    start();
  }, [reset, start]);

  useEffect(() => {
    if (isActive && timeLeft > 0 && !isExpired) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          onTick?.(newTime);
          
          if (newTime <= 0) {
            setIsActive(false);
            setIsExpired(true);
            onTimeUp?.();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeft, isExpired, onTimeUp, onTick]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeLeft,
    isActive,
    isExpired,
    start,
    stop,
    reset,
    restart,
  };
};