import { useState } from 'react';
import Button from './Button';

interface TextRevealProps {
  text: string;
  isRevealed: boolean;
  onReveal: () => void;
  revealButtonText?: string;
  className?: string;
  placeholder?: string;
}

export const TextReveal = ({
  text,
  isRevealed,
  onReveal,
  revealButtonText = '英文を表示',
  className = '',
  placeholder = '🔊 まずは音声を聞いてみましょう',
}: TextRevealProps) => {
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  const handleReveal = () => {
    setHasBeenRevealed(true);
    onReveal();
  };

  if (!isRevealed && !hasBeenRevealed) {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <div className="bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-sm italic">
            {placeholder}
          </p>
        </div>
        <Button
          onClick={handleReveal}
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          👁️ {revealButtonText}
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 transition-all duration-300 ease-in-out">
        <p className="text-gray-800 leading-relaxed">
          {text}
        </p>
      </div>
      {hasBeenRevealed && (
        <p className="text-xs text-green-600 text-center">
          ✓ 英文が表示されました
        </p>
      )}
    </div>
  );
};