import { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number;
  isActive: boolean;
  onTimeUp?: () => void;
  onTick?: (timeLeft: number) => void;
  className?: string;
  showAnimation?: boolean;
}

const Timer = ({ 
  initialTime, 
  isActive, 
  onTimeUp, 
  onTick,
  className = '',
  showAnimation = true,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          onTick?.(newTime);
          
          if (newTime === 0) {
            onTimeUp?.();
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, timeLeft, onTimeUp, onTick]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}秒`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (timeLeft <= 3) return 'text-red-500';
    if (timeLeft <= 5) return 'text-orange-500';
    return 'text-blue-500';
  };

  const baseClasses = 'text-2xl font-bold transition-colors';
  const animationClasses = showAnimation && isActive ? 'animate-pulse' : '';
  const colorClasses = getColorClass();
  
  const classes = [
    baseClasses,
    animationClasses,
    colorClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className='text-center'>
      <div className={classes}>
        {formatTime(timeLeft)}
      </div>
      {isActive && (
        <div className='text-sm text-gray-500 mt-1'>
          残り時間
        </div>
      )}
    </div>
  );
};

export default Timer;