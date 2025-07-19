import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PhraseGroup, Phrase } from '@/lib/types/phrase';
import { usePhraseStore } from '@/lib/store';
import { useSpeechRecognition } from './useSpeechRecognition';

interface UsePhraseTrainingOptions {
  group: PhraseGroup;
  autoAdvance?: boolean;
}

interface UsePhraseTrainingReturn {
  currentPhrase: Phrase | null;
  currentPhraseIndex: number;
  isListening: boolean;
  userResponse: string;
  isCorrect: boolean | null;
  progress: number;
  isComplete: boolean;
  incorrectCount: number;
  startListening: () => void;
  markAsCorrect: () => void;
  markAsIncorrect: () => void;
  nextPhrase: () => void;
  restartTraining: () => void;
  completeTraining: () => void;
}

export const usePhraseTraining = (
  options: UsePhraseTrainingOptions
): UsePhraseTrainingReturn => {
  const { group, autoAdvance: _autoAdvance = true } = options;
  const router = useRouter();
  
  const {
    currentSession,
    isListening: storeIsListening,
    userResponse: storeUserResponse,
    isCorrect: storeIsCorrect,
    startSession,
    endSession,
    nextPhrase: storeNextPhrase,
    setListening,
    setUserResponse,
    markAsCorrect: storeMarkAsCorrect,
    markAsIncorrect: storeMarkAsIncorrect,
    setCorrect,
  } = usePhraseStore();

  const [isInitialized, setIsInitialized] = useState(false);

  // 音声認識フック
  const {
    isListening: speechIsListening,
    transcript: _transcript,
    start: startRecognition,
    reset: resetRecognition,
  } = useSpeechRecognition({
    onStart: () => {
      setListening(true);
      setUserResponse('');
      setCorrect(null);
    },
    onResult: (text: string) => {
      setUserResponse(text);
      setListening(false);
    },
    onError: () => {
      setListening(false);
    },
  });

  // セッション初期化
  useEffect(() => {
    if (!isInitialized && group) {
      startSession(group.id, group.phrases.length);
      setIsInitialized(true);
    }
  }, [group, startSession, isInitialized]);

  // 音声認識状態の同期
  useEffect(() => {
    if (speechIsListening !== storeIsListening) {
      setListening(speechIsListening);
    }
  }, [speechIsListening, storeIsListening, setListening]);

  // 現在の状態
  const currentPhraseIndex = currentSession?.currentPhraseIndex ?? 0;
  const currentPhrase = group?.phrases[currentPhraseIndex] ?? null;
  const completedPhrases = currentSession?.completedPhrases ?? new Set();
  const incorrectPhrases = currentSession?.incorrectPhrases ?? [];
  
  const progress = group ? (completedPhrases.size / group.phrases.length) * 100 : 0;
  const isComplete = completedPhrases.size === group?.phrases.length && incorrectPhrases.length === 0;
  const incorrectCount = incorrectPhrases.length;

  const startListening = () => {
    if (storeIsListening) return;
    resetRecognition();
    startRecognition();
  };

  const markAsCorrect = () => {
    storeMarkAsCorrect();
    
    if (_autoAdvance) {
      setTimeout(() => {
        nextPhrase();
      }, 1000);
    }
  };

  const markAsIncorrect = () => {
    storeMarkAsIncorrect();
  };

  const nextPhrase = () => {
    if (!group || !currentSession) return;

    if (currentPhraseIndex < group.phrases.length - 1) {
      storeNextPhrase();
    } else {
      // 間違えたフレーズがある場合は最初の間違いに戻る
      if (incorrectPhrases.length > 0) {
        // ストアで処理される
        storeNextPhrase();
      } else {
        completeTraining();
      }
    }
  };

  const restartTraining = () => {
    if (group) {
      endSession();
      startSession(group.id, group.phrases.length);
    }
  };

  const completeTraining = () => {
    endSession();
    router.push('/phrase-training');
  };

  return {
    currentPhrase,
    currentPhraseIndex,
    isListening: storeIsListening,
    userResponse: storeUserResponse,
    isCorrect: storeIsCorrect,
    progress,
    isComplete,
    incorrectCount,
    startListening,
    markAsCorrect,
    markAsIncorrect,
    nextPhrase,
    restartTraining,
    completeTraining,
  };
};