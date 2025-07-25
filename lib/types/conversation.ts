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

// 会話セッション状態
export interface ConversationSession {
  sceneId: string;
  currentTurnIndex: number;
  userResponses: string[];
  startTime: Date;
  endTime?: Date;
  completed: boolean;
}

// AI添削関連
export interface AIFeedbackRequest {
  userResponse: string;
  expectedContext: string;
  scene: string;
  turnId: string;
}

export interface AIFeedbackResponse {
  feedback: string;
  basicAnswers: string[];
  nativeAnswers: string[];
  score: number;
  suggestions: string[];
}