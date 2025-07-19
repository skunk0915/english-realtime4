import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scene, ConversationTurn } from '@/lib/types/conversation';
import { useConversationStore } from '@/lib/store';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useTimer } from './useTimer';

interface UseConversationFlowOptions {
  scene: Scene;
  autoAdvance?: boolean;
  responseTimeout?: number;
}

interface UseConversationFlowReturn {
  currentTurn: ConversationTurn | null;
  currentTurnIndex: number;
  isLastTurn: boolean;
  isListening: boolean;
  userResponse: string;
  showResponses: boolean;
  timeLeft: number;
  isTimerActive: boolean;
  startListening: () => void;
  nextTurn: () => void;
  completeConversation: () => void;
  reset: () => void;
}

export const useConversationFlow = (
  options: UseConversationFlowOptions
): UseConversationFlowReturn => {
  const { scene, autoAdvance: _autoAdvance = true, responseTimeout = 6 } = options;
  const router = useRouter();
  
  const {
    currentSession,
    showResponses,
    startSession,
    endSession,
    nextTurn: storeNextTurn,
    setShowResponses,
    setUserResponse,
  } = useConversationStore();

  const [isInitialized, setIsInitialized] = useState(false);

  // 音声認識フック
  const {
    isListening,
    transcript: _transcript,
    start: startRecognition,
    reset: resetRecognition,
  } = useSpeechRecognition({
    onResult: (text: string) => {
      setUserResponse(text);
      setShowResponses(true);
      stopTimer();
    },
    onError: () => {
      stopTimer();
    },
  });

  // タイマーフック
  const {
    timeLeft,
    isActive: isTimerActive,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  } = useTimer({
    initialTime: responseTimeout,
    onTimeUp: () => {
      setShowResponses(true);
    },
  });

  // セッション初期化
  useEffect(() => {
    if (!isInitialized && scene) {
      startSession(scene.id);
      setIsInitialized(true);
    }
  }, [scene, startSession, isInitialized]);

  // 現在のターン情報
  const currentTurnIndex = currentSession?.currentTurnIndex ?? 0;
  const currentTurn = scene?.conversations[currentTurnIndex] ?? null;
  const isLastTurn = currentTurnIndex === (scene?.conversations.length ?? 0) - 1;
  const userResponse = currentSession?.userResponses[currentTurnIndex] ?? '';

  const startListening = () => {
    if (isListening) return;
    
    resetRecognition();
    setShowResponses(false);
    startRecognition();
    resetTimer(responseTimeout);
    startTimer();
  };

  const nextTurn = () => {
    if (!scene || !currentSession) return;

    if (isLastTurn) {
      completeConversation();
    } else {
      storeNextTurn();
      setShowResponses(false);
      resetTimer(responseTimeout);
    }
  };

  const completeConversation = () => {
    endSession();
    router.push('/conversation-training');
  };

  const reset = () => {
    resetRecognition();
    stopTimer();
    resetTimer(responseTimeout);
    setShowResponses(false);
    if (scene) {
      startSession(scene.id);
    }
  };

  return {
    currentTurn,
    currentTurnIndex,
    isLastTurn,
    isListening,
    userResponse,
    showResponses,
    timeLeft,
    isTimerActive,
    startListening,
    nextTurn,
    completeConversation,
    reset,
  };
};