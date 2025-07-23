import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scene, ConversationTurn } from '@/lib/types/conversation';
import { useConversationStore } from '@/lib/store';
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
  userResponse: string;
  showResponses: boolean;
  timeLeft: number;
  isTimerActive: boolean;
  isInputActive: boolean;
  isTimeUp: boolean;
  handleSpeechConfirm: (transcript: string) => void;
  handleSpeechCancel: () => void;
  handleSpeechRetry: () => void;
  handleAudioPlayEnd: () => void;
  handleRetryAfterTimeUp: () => void;
  handleShowCorrectAnswer: () => void;
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
  const [isInputActive, setIsInputActive] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

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
      setIsTimeUp(true);
      setIsInputActive(false);
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

  // セッション開始時の状態管理
  useEffect(() => {
    if (currentSession && !showResponses) {
      // 音声再生が完了するまで入力は無効
      setIsInputActive(false);
    } else {
      setIsInputActive(false);
    }
  }, [currentSession, showResponses]);

  const handleSpeechConfirm = (transcript: string) => {
    console.log('✅ 音声入力確定:', transcript);
    setUserResponse(transcript);
    setShowResponses(true);
    setIsInputActive(false);
    stopTimer(); // 確認後はタイマー停止
  };

  const handleSpeechCancel = () => {
    setIsInputActive(false);
    stopTimer();
  };

  const handleSpeechRetry = () => {
    console.log('🔄 話し直しでタイマーをリスタート');
    // タイマーをリスタート
    resetTimer(responseTimeout);
    startTimer();
    
    // 入力状態を維持
    setIsInputActive(true);
  };

  const handleRetryAfterTimeUp = () => {
    console.log('🔄 時間切れ後のやり直し');
    setIsTimeUp(false);
    setIsInputActive(true);
    resetTimer(responseTimeout);
    startTimer();
  };

  const handleShowCorrectAnswer = () => {
    console.log('💡 正解例を表示');
    setShowResponses(true);
  };

  const handleAudioPlayEnd = () => {
    // 音声再生完了後に6秒タイマーを開始
    if (!showResponses && currentSession) {
      setIsInputActive(true);
      resetTimer(responseTimeout);
      startTimer();
    }
  };

  const nextTurn = () => {
    if (!scene || !currentSession) return;

    if (isLastTurn) {
      completeConversation();
    } else {
      storeNextTurn();
      setShowResponses(false);
      setIsTimeUp(false);
      setIsInputActive(false); // 最初はfalseにして、音声再生後にtrueにする
      resetTimer(responseTimeout);
    }
  };

  const completeConversation = () => {
    endSession();
    router.push('/conversation-training');
  };

  const reset = () => {
    stopTimer();
    resetTimer(responseTimeout);
    setShowResponses(false);
    setIsTimeUp(false);
    setIsInputActive(false);
    if (scene) {
      startSession(scene.id);
    }
  };

  return {
    currentTurn,
    currentTurnIndex,
    isLastTurn,
    userResponse,
    showResponses,
    timeLeft,
    isTimerActive,
    isInputActive,
    isTimeUp,
    handleSpeechConfirm,
    handleSpeechCancel,
    handleSpeechRetry,
    handleAudioPlayEnd,
    handleRetryAfterTimeUp,
    handleShowCorrectAnswer,
    nextTurn,
    completeConversation,
    reset,
  };
};