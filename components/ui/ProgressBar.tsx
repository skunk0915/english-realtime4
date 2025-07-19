interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  label?: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
  animated?: boolean;
}

const ProgressBar = ({ 
  progress, 
  className = '',
  showLabel = true,
  label,
  color = 'green',
  animated = true,
}: ProgressBarProps) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  const baseContainerClasses = 'w-full bg-gray-200 rounded-full h-2';
  const baseBarClasses = 'h-2 rounded-full transition-all duration-300';
  const animationClasses = animated ? 'transition-all duration-300' : '';
  
  const containerClasses = [baseContainerClasses, className].filter(Boolean).join(' ');
  const barClasses = [
    baseBarClasses,
    colorClasses[color],
    animationClasses,
  ].filter(Boolean).join(' ');

  const displayLabel = label || (showLabel ? `${Math.round(progress)}%` : '');

  return (
    <div className='space-y-1'>
      {displayLabel && (
        <div className='flex justify-between items-center'>
          <span className='text-xs text-gray-600'>{displayLabel}</span>
          {showLabel && !label && (
            <span className='text-xs text-gray-600'>{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className={containerClasses}>
        <div 
          className={barClasses}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;