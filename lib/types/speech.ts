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

// 音声認識の結果型
export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  timestamp: Date;
  isFinal: boolean;
}

// 音声再生関連の型
export interface AudioPlaybackOptions {
  speed: 'normal' | 'slow';
  volume?: number;
}

export interface TTSResponse {
  audioData: string;
  mimeType: string;
}

// エラー型
export interface SpeechError {
  type: 'recognition' | 'synthesis' | 'permission';
  message: string;
  code?: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}