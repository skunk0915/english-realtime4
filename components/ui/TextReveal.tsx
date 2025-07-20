import { useState } from 'react';
import Button from './Button';

interface TextRevealProps {
  text: string;
  isRevealed: boolean;
  onReveal: () => void;
  revealButtonText?: string;
  className?: string;
  placeholder?: string;
  translation?: string;
}

export const TextReveal = ({
  text,
  isRevealed,
  onReveal,
  revealButtonText = '英文を表示',
  className = '',
  placeholder = '🔊 まずは音声を聞いてみましょう',
  translation,
}: TextRevealProps) => {
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

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
        <div className="flex space-x-2 justify-center">
          <Button
            onClick={handleReveal}
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            👁️ {revealButtonText}
          </Button>
          {translation && (
            <Button
              onClick={() => setShowTranslation(!showTranslation)}
              variant="outline"
              size="sm"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              🗾 日本語訳
            </Button>
          )}
        </div>
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
      {translation && (
        <div className="text-center">
          <Button
            onClick={() => setShowTranslation(!showTranslation)}
            variant="outline"
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            🗾 {showTranslation ? '日本語訳を隠す' : '日本語訳を表示'}
          </Button>
          {showTranslation && (
            <div className="mt-3 bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-gray-700 text-sm">
                {translation}
              </p>
            </div>
          )}
        </div>
      )}
      {hasBeenRevealed && (
        <p className="text-xs text-green-600 text-center">
          ✓ 英文が表示されました
        </p>
      )}
    </div>
  );
};