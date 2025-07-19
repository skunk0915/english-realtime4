export interface ReviewItem {
  id: string;
  type: 'conversation' | 'phrase';
  sceneId?: string;
  phraseId?: string;
  conversationId?: string;
  addedAt: Date;
  lastReviewed?: Date;
  nextReview: Date;
  difficulty: number;
  easeFactor: number;
  repetitionCount: number;
}

// 忘却曲線に基づく復習システム
export interface ReviewSchedule {
  itemId: string;
  intervals: number[]; // 復習間隔（日数）
  currentInterval: number;
  nextReviewDate: Date;
}

// 復習セッション
export interface ReviewSession {
  id: string;
  itemIds: string[];
  currentIndex: number;
  results: ReviewResult[];
  startTime: Date;
  endTime?: Date;
}

export interface ReviewResult {
  itemId: string;
  success: boolean;
  responseTime: number;
  difficulty: 'easy' | 'good' | 'hard' | 'again';
  timestamp: Date;
}