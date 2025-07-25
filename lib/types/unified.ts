// =============================================================================
// 統合型定義システム - リファクタリング仕様書に基づく型統合
// =============================================================================

// =============================================================================
// 基本データ構造
// =============================================================================

// 会話システム関連
export interface ConversationTurn {
  id: string;
  speaker: 'ai' | 'user';
  text: string;
  audio?: string;
  responses?: ConversationResponse[];
  context?: string;
  translation?: string;
  japaneseExample?: string;
}

export interface ConversationResponse {
  id: string;
  level: 'beginner' | 'native';
  text: string;
  audio: string;
  audioSlow: string;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  category: string;
  conversations: ConversationTurn[];
}

// フレーズシステム関連
export interface Phrase {
  id: string;
  japanese: string;
  english: string;
  audio: string;
  audioSlow: string;
}

export interface PhraseGroup {
  id: string;
  title: string;
  category: string;
  phrases: Phrase[];
}

// =============================================================================
// 音声システム統合型
// =============================================================================

// 統合音声状態
export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentSpeed: 'normal' | 'slow';
  hasEnded: boolean;
  error: AudioError | null;
  autoPlayBlocked?: boolean;
}

// 統合音声オプション
export interface AudioOptions {
  speed?: 'normal' | 'slow';
  volume?: number;
  autoPlay?: boolean;
  cacheEnabled?: boolean;
}

// 音声サービス用型
export interface AudioBlob {
  blob: Blob;
  url: string;
  mimeType: string;
}

export interface TTSRequest {
  text: string;
  speed: number;
  language?: string;
}

export interface TTSResponse {
  audioData: string;
  mimeType: string;
}

// =============================================================================
// 音声認識システム統合型
// =============================================================================

// 統合音声認識状態
export interface SpeechState {
  phase: 'idle' | 'listening' | 'processing' | 'confirming';
  transcript: string;
  confidence: number;
  isListening: boolean;
  error: SpeechError | null;
  isSupported: boolean;
}

// 音声認識設定
export interface SpeechOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  autoStart?: boolean;
}

// 音声認識結果
export interface SpeechResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  timestamp: Date;
}

// Web Speech API型定義
export interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

export interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

export interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// =============================================================================
// トレーニングシステム統合型
// =============================================================================

// 統合セッション基底型
export interface BaseSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  totalAttempts: number;
}

// 会話セッション
export interface ConversationSession extends BaseSession {
  type: 'conversation';
  sceneId: string;
  currentTurnIndex: number;
  userResponses: string[];
}

// フレーズセッション
export interface PhraseSession extends BaseSession {
  type: 'phrase';
  groupId: string;
  currentPhraseIndex: number;
  completedPhrases: Set<number>;
  incorrectPhrases: number[];
}

// 統合セッション型
export type TrainingSession = ConversationSession | PhraseSession;

// トレーニング進捗
export interface TrainingProgress {
  currentIndex: number;
  totalItems: number;
  correctCount: number;
  incorrectCount: number;
  completionRate: number;
}

// 自己採点結果
export interface SelfAssessmentResult {
  phraseId: string;
  isCorrect: boolean;
  timestamp: Date;
  attempts: number;
}

// =============================================================================
// エラーハンドリング統合型
// =============================================================================

// 統合エラー基底型
export interface BaseError {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
  recoverable: boolean;
  context?: Record<string, unknown>;
}

// 音声エラー
export interface AudioError extends BaseError {
  type: 'audio_load' | 'audio_play' | 'tts_api' | 'audio_permission';
}

// 音声認識エラー
export interface SpeechError extends BaseError {
  type: 'speech_recognition' | 'speech_permission' | 'speech_not_supported';
  code?: string;
}

// ネットワークエラー
export interface NetworkError extends BaseError {
  type: 'network_connection' | 'api_timeout' | 'api_error';
  statusCode?: number;
}

// システムエラー
export interface SystemError extends BaseError {
  type: 'validation' | 'storage' | 'unknown';
}

// 統合エラー型
export type AppError = AudioError | SpeechError | NetworkError | SystemError;

// エラー回復戦略
export interface ErrorRecoveryStrategy {
  type: 'retry' | 'fallback' | 'reset' | 'redirect';
  maxAttempts?: number;
  delay?: number;
  fallbackAction?: () => void;
}

// =============================================================================
// 状態管理統合型
// =============================================================================

// UI状態
export interface UIState {
  isLoading: boolean;
  error: AppError | null;
  notifications: Notification[];
  theme: 'light' | 'dark';
}

// 統合アプリケーション状態
export interface UnifiedAppState {
  // 共通状態
  ui: UIState;
  audio: AudioState;
  speech: SpeechState;
  
  // 機能別状態
  training: {
    currentSession: TrainingSession | null;
    sessions: TrainingSession[];
    progress: TrainingProgress;
  };
  
  review: {
    items: ReviewItem[];
    currentItem: ReviewItem | null;
    settings: ReviewSettings;
  };
  
  user: {
    profile: UserProfile | null;
    preferences: UserPreferences;
    statistics: UserStatistics;
  };
}

// 状態スライス基底型
export interface StateSlice<T> {
  data: T;
  loading: boolean;
  error: AppError | null;
  lastUpdated: Date;
}

// =============================================================================
// ユーザーシステム統合型
// =============================================================================

// ユーザープロファイル
export interface UserProfile {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  joinedAt: Date;
  lastActiveAt: Date;
}

// ユーザー設定
export interface UserPreferences {
  audioSpeed: 'normal' | 'slow';
  language: 'ja' | 'en';
  theme: 'light' | 'dark';
  notifications: boolean;
  autoPlay: boolean;
  speechRecognition: boolean;
}

// ユーザー統計
export interface UserStatistics {
  totalSessions: number;
  averageScore: number;
  streakDays: number;
  conversationStats: {
    totalCompleted: number;
    averageResponseTime: number;
    favoriteScenes: string[];
  };
  phraseStats: {
    totalCompleted: number;
    accuracyRate: number;
    favoriteCategories: string[];
  };
}

// =============================================================================
// レビューシステム統合型
// =============================================================================

export interface ReviewItem {
  id: string;
  type: 'conversation' | 'phrase';
  itemId: string; // sceneId or phraseId
  addedAt: Date;
  lastReviewed?: Date;
  nextReview: Date;
  difficulty: number;
  metadata?: Record<string, unknown>;
}

export interface ReviewSettings {
  enableSpacedRepetition: boolean;
  reviewReminders: boolean;
  dailyGoal: number;
  difficultyWeighting: boolean;
}

// =============================================================================
// 設定管理統合型
// =============================================================================

export interface AppConfig {
  audio: AudioConfig;
  speech: SpeechConfig;
  training: TrainingConfig;
  ui: UIConfig;
  api: ApiConfig;
}

export interface AudioConfig {
  defaultSpeed: 'normal' | 'slow';
  defaultVolume: number;
  cacheSize: number;
  cacheTTL: number;
  retryAttempts: number;
  timeout: number;
}

export interface SpeechConfig {
  defaultLanguage: string;
  confidenceThreshold: number;
  timeout: number;
  retryAttempts: number;
  continuous: boolean;
  interimResults: boolean;
}

export interface TrainingConfig {
  sessionTimeout: number;
  autoAdvance: boolean;
  responseTimeout: number;
  enableHints: boolean;
  maxRetries: number;
}

export interface UIConfig {
  theme: 'light' | 'dark';
  animations: boolean;
  compactMode: boolean;
  showProgressBar: boolean;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  rateLimitEnabled: boolean;
}

// =============================================================================
// パフォーマンス測定型
// =============================================================================

export interface PerformanceMetrics {
  componentRenderCount: Record<string, number>;
  apiCallDuration: Record<string, number>;
  memoryUsage: MemoryUsage;
  cacheHitRate: number;
  errorRate: number;
}

export interface MemoryUsage {
  audioCache: number;
  stateSize: number;
  componentCount: number;
  totalHeapSize: number;
}

// =============================================================================
// API統合型
// =============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

// =============================================================================
// イベントシステム型
// =============================================================================

export interface AppEvent {
  id: string;
  type: string;
  timestamp: Date;
  source: string;
  data?: Record<string, unknown>;
}

// =============================================================================
// 通知システム型
// =============================================================================

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  autoClose?: boolean;
  duration?: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

// =============================================================================
// Global Window拡張
// =============================================================================

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// =============================================================================
// ユーティリティ型
// =============================================================================

// 部分的な更新用型
export type PartialUpdate<T> = Partial<T> & { id: string };

// 必須フィールドを指定する型
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// オプショナルフィールドを指定する型
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// タグ付きユニオン型のヘルパー
export type Tagged<T, Tag extends string> = T & { readonly _tag: Tag };
