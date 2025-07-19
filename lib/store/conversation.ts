import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ConversationSession } from '@/lib/types/conversation';

interface ConversationState {
  // 現在のセッション
  currentSession: ConversationSession | null;
  // 音声認識状態
  isListening: boolean;
  userResponse: string;
  // UI状態
  showResponses: boolean;
  timeLeft: number;
  isTimerActive: boolean;
  // セッション履歴
  sessions: ConversationSession[];
}

interface ConversationActions {
  // セッション管理
  startSession: (sceneId: string) => void;
  endSession: () => void;
  nextTurn: () => void;
  // 音声認識
  setListening: (isListening: boolean) => void;
  setUserResponse: (response: string) => void;
  // UI状態管理
  setShowResponses: (show: boolean) => void;
  setTimeLeft: (time: number) => void;
  setTimerActive: (active: boolean) => void;
  // リセット
  resetSession: () => void;
}

type ConversationStore = ConversationState & ConversationActions;

export const useConversationStore = create<ConversationStore>()(
  persist(
    (set, get) => ({
      // 初期状態
      currentSession: null,
      isListening: false,
      userResponse: '',
      showResponses: false,
      timeLeft: 6,
      isTimerActive: false,
      sessions: [],

      // アクション
      startSession: (sceneId: string) => {
        const newSession: ConversationSession = {
          sceneId,
          currentTurnIndex: 0,
          userResponses: [],
          startTime: new Date(),
          completed: false,
        };
        set({
          currentSession: newSession,
          userResponse: '',
          showResponses: false,
          timeLeft: 6,
          isTimerActive: false,
        });
      },

      endSession: () => {
        const { currentSession, sessions } = get();
        if (currentSession) {
          const completedSession = {
            ...currentSession,
            endTime: new Date(),
            completed: true,
          };
          set({
            currentSession: null,
            sessions: [...sessions, completedSession],
          });
        }
      },

      nextTurn: () => {
        const { currentSession } = get();
        if (currentSession) {
          set({
            currentSession: {
              ...currentSession,
              currentTurnIndex: currentSession.currentTurnIndex + 1,
            },
            userResponse: '',
            showResponses: false,
            timeLeft: 6,
            isTimerActive: false,
          });
        }
      },

      setListening: (isListening: boolean) => set({ isListening }),
      
      setUserResponse: (response: string) => {
        const { currentSession } = get();
        if (currentSession) {
          const updatedResponses = [...currentSession.userResponses];
          updatedResponses[currentSession.currentTurnIndex] = response;
          set({
            userResponse: response,
            currentSession: {
              ...currentSession,
              userResponses: updatedResponses,
            },
          });
        } else {
          set({ userResponse: response });
        }
      },

      setShowResponses: (show: boolean) => set({ showResponses: show }),
      setTimeLeft: (time: number) => set({ timeLeft: time }),
      setTimerActive: (active: boolean) => set({ isTimerActive: active }),

      resetSession: () => set({
        currentSession: null,
        isListening: false,
        userResponse: '',
        showResponses: false,
        timeLeft: 6,
        isTimerActive: false,
      }),
    }),
    {
      name: 'conversation-store',
      partialize: (state) => ({ sessions: state.sessions }),
    }
  )
);