import { useEffect, useState } from 'react';
import { ReviewItem, ReviewSession } from '@/lib/types/review';
import { useReviewStore } from '@/lib/store';

interface UseReviewSystemOptions {
  autoLoadDueItems?: boolean;
}

interface UseReviewSystemReturn {
  dueItems: ReviewItem[];
  currentSession: ReviewSession | null;
  currentItem: ReviewItem | null;
  sessionProgress: number;
  isSessionActive: boolean;
  addToReview: (type: 'conversation' | 'phrase', itemId: string, additionalData?: Record<string, string>) => void;
  startSession: (itemIds?: string[]) => void;
  endSession: () => void;
  recordResult: (success: boolean, difficulty: 'easy' | 'good' | 'hard' | 'again', responseTime?: number) => void;
  nextItem: () => void;
  getDueCount: () => number;
  refreshDueItems: () => void;
}

export const useReviewSystem = (
  options: UseReviewSystemOptions = {}
): UseReviewSystemReturn => {
  const { autoLoadDueItems = true } = options;
  
  const {
    reviewItems,
    currentSession,
    addReviewItem,
    removeReviewItem,
    startReviewSession,
    endReviewSession,
    recordResult: storeRecordResult,
    scheduleNextReview,
    getDueItems,
  } = useReviewStore();

  const [dueItems, setDueItems] = useState<ReviewItem[]>([]);

  // 期限の来たアイテムを取得
  const refreshDueItems = () => {
    const items = getDueItems();
    setDueItems(items);
  };

  useEffect(() => {
    if (autoLoadDueItems) {
      refreshDueItems();
    }
  }, [autoLoadDueItems, reviewItems]);

  // 現在のセッション情報
  const currentItemIndex = currentSession?.currentIndex ?? 0;
  const currentItem = currentSession ? dueItems.find(item => 
    item.id === currentSession.itemIds[currentItemIndex]
  ) ?? null : null;
  
  const sessionProgress = currentSession 
    ? (currentSession.results.length / currentSession.itemIds.length) * 100 
    : 0;
  
  const isSessionActive = currentSession !== null;

  const addToReview = (
    type: 'conversation' | 'phrase', 
    itemId: string, 
    additionalData: Record<string, string> = {}
  ) => {
    const newItem = {
      type,
      difficulty: 1,
      ...(type === 'conversation' 
        ? { conversationId: itemId, sceneId: additionalData.sceneId }
        : { phraseId: itemId }
      ),
    };

    addReviewItem(newItem);
  };

  const startSession = (itemIds?: string[]) => {
    const sessionItemIds = itemIds || dueItems.map(item => item.id);
    if (sessionItemIds.length === 0) return;

    startReviewSession(sessionItemIds);
  };

  const endSession = () => {
    endReviewSession();
    refreshDueItems(); // セッション終了後に期限アイテムを更新
  };

  const recordResult = (
    success: boolean, 
    difficulty: 'easy' | 'good' | 'hard' | 'again',
    responseTime: number = 0
  ) => {
    if (!currentSession || !currentItem) return;

    // 結果を記録
    storeRecordResult({
      itemId: currentItem.id,
      success,
      responseTime,
      difficulty,
    });

    // 次回復習をスケジュール
    scheduleNextReview(currentItem.id, difficulty);
  };

  const nextItem = () => {
    if (!currentSession) return;

    const nextIndex = currentSession.currentIndex + 1;
    
    if (nextIndex >= currentSession.itemIds.length) {
      // セッション完了
      endSession();
    } else {
      // 次のアイテムに進む（ストアで管理）
      // 現在の実装では手動でインデックスを更新する必要がある
    }
  };

  const getDueCount = () => {
    return dueItems.length;
  };

  return {
    dueItems,
    currentSession,
    currentItem,
    sessionProgress,
    isSessionActive,
    addToReview,
    startSession,
    endSession,
    recordResult,
    nextItem,
    getDueCount,
    refreshDueItems,
  };
};