// 共通の型定義

// アプリケーション全体の状態
export interface AppState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

// ユーザー情報
export interface User {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  preferences: UserPreferences;
}

export interface UserPreferences {
  audioSpeed: 'normal' | 'slow';
  language: 'ja' | 'en';
  theme: 'light' | 'dark';
  notifications: boolean;
}

// 進捗統計
export interface UserStatistics {
  totalSessions: number;
  averageScore: number;
  streakDays: number;
  lastActiveDate: Date;
  conversationStats: ConversationStats;
  phraseStats: PhraseStats;
}

export interface ConversationStats {
  totalCompleted: number;
  averageResponseTime: number;
  favoriteScenes: string[];
}

export interface PhraseStats {
  totalCompleted: number;
  accuracyRate: number;
  favoriteCategories: string[];
}

// API関連
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// 汎用的なイベント型
export interface AppEvent {
  type: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}