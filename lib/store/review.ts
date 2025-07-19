import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReviewItem, ReviewSession, ReviewResult } from '@/lib/types/review';

interface ReviewState {
  // 復習アイテム
  reviewItems: ReviewItem[];
  // 現在のセッション
  currentSession: ReviewSession | null;
  // セッション履歴
  sessions: ReviewSession[];
}

interface ReviewActions {
  // 復習アイテム管理
  addReviewItem: (item: Omit<ReviewItem, 'id' | 'addedAt' | 'nextReview'>) => void;
  removeReviewItem: (id: string) => void;
  updateReviewItem: (id: string, updates: Partial<ReviewItem>) => void;
  // セッション管理
  startReviewSession: (itemIds: string[]) => void;
  endReviewSession: () => void;
  recordResult: (result: Omit<ReviewResult, 'timestamp'>) => void;
  // スケジューリング
  scheduleNextReview: (itemId: string, difficulty: 'easy' | 'good' | 'hard' | 'again') => void;
  getDueItems: () => ReviewItem[];
}

type ReviewStore = ReviewState & ReviewActions;

// 忘却曲線に基づく次回復習日の計算
const calculateNextReview = (
  easeFactor: number,
  repetitionCount: number,
  difficulty: 'easy' | 'good' | 'hard' | 'again'
): { nextReview: Date; newEaseFactor: number; newRepetitionCount: number } => {
  let newEaseFactor = easeFactor;
  let newRepetitionCount = repetitionCount;
  let interval = 1;

  switch (difficulty) {
    case 'again':
      newRepetitionCount = 0;
      interval = 1;
      newEaseFactor = Math.max(1.3, easeFactor - 0.2);
      break;
    case 'hard':
      interval = Math.max(1, Math.round(interval * 1.2));
      newEaseFactor = Math.max(1.3, easeFactor - 0.15);
      break;
    case 'good':
      if (newRepetitionCount === 0) {
        interval = 1;
      } else if (newRepetitionCount === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      newRepetitionCount += 1;
      break;
    case 'easy':
      if (newRepetitionCount === 0) {
        interval = 4;
      } else {
        interval = Math.round(interval * easeFactor * 1.3);
      }
      newRepetitionCount += 1;
      newEaseFactor = easeFactor + 0.15;
      break;
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return { nextReview, newEaseFactor, newRepetitionCount };
};

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      // 初期状態
      reviewItems: [],
      currentSession: null,
      sessions: [],

      // アクション
      addReviewItem: (itemData) => {
        const newItem: ReviewItem = {
          ...itemData,
          id: crypto.randomUUID(),
          addedAt: new Date(),
          nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24時間後
          easeFactor: 2.5,
          repetitionCount: 0,
        };
        set(state => ({
          reviewItems: [...state.reviewItems, newItem],
        }));
      },

      removeReviewItem: (id: string) => {
        set(state => ({
          reviewItems: state.reviewItems.filter(item => item.id !== id),
        }));
      },

      updateReviewItem: (id: string, updates: Partial<ReviewItem>) => {
        set(state => ({
          reviewItems: state.reviewItems.map(item =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },

      startReviewSession: (itemIds: string[]) => {
        const newSession: ReviewSession = {
          id: crypto.randomUUID(),
          itemIds,
          currentIndex: 0,
          results: [],
          startTime: new Date(),
        };
        set({ currentSession: newSession });
      },

      endReviewSession: () => {
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

      recordResult: (resultData) => {
        const { currentSession } = get();
        if (currentSession) {
          const result: ReviewResult = {
            ...resultData,
            timestamp: new Date(),
          };
          set({
            currentSession: {
              ...currentSession,
              results: [...currentSession.results, result],
            },
          });
        }
      },

      scheduleNextReview: (itemId: string, difficulty: 'easy' | 'good' | 'hard' | 'again') => {
        const { reviewItems } = get();
        const item = reviewItems.find(i => i.id === itemId);
        if (item) {
          const { nextReview, newEaseFactor, newRepetitionCount } = calculateNextReview(
            item.easeFactor,
            item.repetitionCount,
            difficulty
          );
          
          set(state => ({
            reviewItems: state.reviewItems.map(i =>
              i.id === itemId
                ? {
                    ...i,
                    nextReview,
                    easeFactor: newEaseFactor,
                    repetitionCount: newRepetitionCount,
                    lastReviewed: new Date(),
                  }
                : i
            ),
          }));
        }
      },

      getDueItems: () => {
        const { reviewItems } = get();
        const now = new Date();
        return reviewItems.filter(item => item.nextReview <= now);
      },
    }),
    {
      name: 'review-store',
    }
  )
);