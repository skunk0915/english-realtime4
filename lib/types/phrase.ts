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
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

// フレーズトレーニングセッション
export interface PhraseSession {
  groupId: string;
  currentPhraseIndex: number;
  completedPhrases: Set<number>;
  incorrectPhrases: number[];
  startTime: Date;
  endTime?: Date;
  totalAttempts: number;
}

// 自己採点結果
export interface SelfAssessmentResult {
  phraseId: string;
  userResponse: string;
  isCorrect: boolean;
  timestamp: Date;
  retryCount: number;
}