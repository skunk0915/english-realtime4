import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PhraseSession, SelfAssessmentResult } from '@/lib/types/phrase';

interface PhraseState {
  // 現在のセッション
  currentSession: PhraseSession | null;
  // 音声認識状態
  isListening: boolean;
  userResponse: string;
  // 自己採点状態
  isCorrect: boolean | null;
  // セッション履歴
  sessions: PhraseSession[];
  assessmentResults: SelfAssessmentResult[];
}

interface PhraseActions {
  // セッション管理
  startSession: (groupId: string, totalPhrases: number) => void;
  endSession: () => void;
  nextPhrase: () => void;
  // 音声認識
  setListening: (isListening: boolean) => void;
  setUserResponse: (response: string) => void;
  // 自己採点
  markAsCorrect: () => void;
  markAsIncorrect: () => void;
  setCorrect: (correct: boolean | null) => void;
  // リセット
  resetSession: () => void;
}

type PhraseStore = PhraseState & PhraseActions;

export const usePhraseStore = create<PhraseStore>()(
  persist(
    (set, get) => ({
      // 初期状態
      currentSession: null,
      isListening: false,
      userResponse: '',
      isCorrect: null,
      sessions: [],
      assessmentResults: [],

      // アクション
      startSession: (groupId: string, _totalPhrases: number) => {
        const newSession: PhraseSession = {
          groupId,
          currentPhraseIndex: 0,
          completedPhrases: new Set(),
          incorrectPhrases: [],
          startTime: new Date(),
          totalAttempts: 0,
        };
        set({
          currentSession: newSession,
          userResponse: '',
          isCorrect: null,
        });
      },

      endSession: () => {
        const { currentSession, sessions } = get();
        if (currentSession) {
          const completedSession = {
            ...currentSession,
            endTime: new Date(),
          };
          set({
            currentSession: null,
            sessions: [...sessions, completedSession],
          });
        }
      },

      nextPhrase: () => {
        const { currentSession } = get();
        if (currentSession) {
          set({
            currentSession: {
              ...currentSession,
              currentPhraseIndex: currentSession.currentPhraseIndex + 1,
              totalAttempts: currentSession.totalAttempts + 1,
            },
            userResponse: '',
            isCorrect: null,
          });
        }
      },

      setListening: (isListening: boolean) => set({ isListening }),
      setUserResponse: (response: string) => set({ userResponse: response }),

      markAsCorrect: () => {
        const { currentSession } = get();
        if (currentSession) {
          const newCompleted = new Set(currentSession.completedPhrases);
          newCompleted.add(currentSession.currentPhraseIndex);
          set({
            currentSession: {
              ...currentSession,
              completedPhrases: newCompleted,
            },
            isCorrect: true,
          });
        }
      },

      markAsIncorrect: () => {
        const { currentSession } = get();
        if (currentSession && !currentSession.incorrectPhrases.includes(currentSession.currentPhraseIndex)) {
          set({
            currentSession: {
              ...currentSession,
              incorrectPhrases: [...currentSession.incorrectPhrases, currentSession.currentPhraseIndex],
            },
            isCorrect: false,
          });
        }
      },

      setCorrect: (correct: boolean | null) => set({ isCorrect: correct }),

      resetSession: () => set({
        currentSession: null,
        isListening: false,
        userResponse: '',
        isCorrect: null,
      }),
    }),
    {
      name: 'phrase-store',
      partialize: (state) => ({ 
        sessions: state.sessions,
        assessmentResults: state.assessmentResults,
      }),
    }
  )
);