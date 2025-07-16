export interface ConversationTurn {
  id: string;
  speaker: 'ai' | 'user';
  text: string;
  audio?: string;
  responses?: ConversationResponse[];
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

export interface PhraseGroup {
  id: string;
  title: string;
  category: string;
  phrases: Phrase[];
}

export interface Phrase {
  id: string;
  japanese: string;
  english: string;
  audio: string;
  audioSlow: string;
}

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
}