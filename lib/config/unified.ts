// =============================================================================
// 統合設定管理システム - リファクタリング仕様書に基づく設定統合
// =============================================================================

import type { AppConfig } from '@/lib/types/unified';

// =============================================================================
// 定数定義 - マジックナンバーを除去
// =============================================================================

// 音声関連定数
export const AUDIO_CONSTANTS = {
  DEFAULT_VOLUME: 1.0,
  SLOW_SPEED_RATE: 0.7,
  NORMAL_SPEED_RATE: 1.0,
  CACHE_SIZE_MB: 50,
  CACHE_TTL_MINUTES: 30,
  MAX_RETRY_ATTEMPTS: 3,
  TIMEOUT_MS: 10000,
  AUTO_CLOSE_DELAY_MS: 500,
} as const;

// 音声認識関連定数
export const SPEECH_CONSTANTS = {
  DEFAULT_LANGUAGE: 'ja-JP',
  CONFIDENCE_THRESHOLD: 0.7,
  TIMEOUT_MS: 30000,
  MAX_RETRY_ATTEMPTS: 2,
  CONTINUOUS_MODE: true,
  INTERIM_RESULTS: true,
  RESET_TIMEOUT_MS: 1500,
} as const;

// トレーニング関連定数
export const TRAINING_CONSTANTS = {
  SESSION_TIMEOUT_MINUTES: 30,
  RESPONSE_TIMEOUT_SECONDS: 6,
  AUTO_ADVANCE_DELAY_MS: 2000,
  MAX_RETRIES: 3,
  HINT_DELAY_MS: 5000,
} as const;

// UI関連定数
export const UI_CONSTANTS = {
  NOTIFICATION_AUTO_CLOSE_MS: 5000,
  LOADING_DEBOUNCE_MS: 200,
  ANIMATION_DURATION_MS: 300,
  PROGRESS_UPDATE_INTERVAL_MS: 100,
} as const;

// API関連定数
export const API_CONSTANTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  TIMEOUT_MS: 15000,
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
  RATE_LIMIT_REQUESTS_PER_MINUTE: 60,
} as const;

// =============================================================================
// 環境別設定
// =============================================================================

// 開発環境設定
const DEVELOPMENT_CONFIG: AppConfig = {
  audio: {
    defaultSpeed: 'normal',
    defaultVolume: AUDIO_CONSTANTS.DEFAULT_VOLUME,
    cacheSize: AUDIO_CONSTANTS.CACHE_SIZE_MB,
    cacheTTL: AUDIO_CONSTANTS.CACHE_TTL_MINUTES,
    retryAttempts: AUDIO_CONSTANTS.MAX_RETRY_ATTEMPTS,
    timeout: AUDIO_CONSTANTS.TIMEOUT_MS,
  },
  speech: {
    defaultLanguage: SPEECH_CONSTANTS.DEFAULT_LANGUAGE,
    confidenceThreshold: SPEECH_CONSTANTS.CONFIDENCE_THRESHOLD,
    timeout: SPEECH_CONSTANTS.TIMEOUT_MS,
    retryAttempts: SPEECH_CONSTANTS.MAX_RETRY_ATTEMPTS,
    continuous: SPEECH_CONSTANTS.CONTINUOUS_MODE,
    interimResults: SPEECH_CONSTANTS.INTERIM_RESULTS,
  },
  training: {
    sessionTimeout: TRAINING_CONSTANTS.SESSION_TIMEOUT_MINUTES * 60 * 1000,
    autoAdvance: true,
    responseTimeout: TRAINING_CONSTANTS.RESPONSE_TIMEOUT_SECONDS * 1000,
    enableHints: true,
    maxRetries: TRAINING_CONSTANTS.MAX_RETRIES,
  },
  ui: {
    theme: 'light',
    animations: true,
    compactMode: false,
    showProgressBar: true,
  },
  api: {
    baseUrl: API_CONSTANTS.BASE_URL,
    timeout: API_CONSTANTS.TIMEOUT_MS,
    retryAttempts: API_CONSTANTS.MAX_RETRY_ATTEMPTS,
    rateLimitEnabled: false, // 開発時は無効
  },
};

// 本番環境設定
const PRODUCTION_CONFIG: AppConfig = {
  ...DEVELOPMENT_CONFIG,
  audio: {
    ...DEVELOPMENT_CONFIG.audio,
    retryAttempts: 2, // 本番はリトライ回数を減らす
  },
  speech: {
    ...DEVELOPMENT_CONFIG.speech,
    confidenceThreshold: 0.8, // 本番はより厳しく
  },
  training: {
    ...DEVELOPMENT_CONFIG.training,
    enableHints: false, // 本番はヒント無効
  },
  ui: {
    ...DEVELOPMENT_CONFIG.ui,
    animations: false, // パフォーマンス優先
  },
  api: {
    ...DEVELOPMENT_CONFIG.api,
    rateLimitEnabled: true, // 本番はレート制限有効
  },
};

// テスト環境設定
const TEST_CONFIG: AppConfig = {
  ...DEVELOPMENT_CONFIG,
  audio: {
    ...DEVELOPMENT_CONFIG.audio,
    timeout: 5000, // テストは短いタイムアウト
    cacheSize: 10, // テスト用にサイズを減らす
  },
  speech: {
    ...DEVELOPMENT_CONFIG.speech,
    timeout: 10000, // テスト用に短いタイムアウト
  },
  training: {
    ...DEVELOPMENT_CONFIG.training,
    responseTimeout: 3000, // テスト用に短縮
  },
};

// =============================================================================
// 設定取得関数
// =============================================================================

/**
 * 環境に応じた設定を取得する
 */
export function getAppConfig(): AppConfig {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return PRODUCTION_CONFIG;
    case 'test':
      return TEST_CONFIG;
    case 'development':
    default:
      return DEVELOPMENT_CONFIG;
  }
}

/**
 * 特定の設定カテゴリを取得する
 */
export function getAudioConfig() {
  return getAppConfig().audio;
}

export function getSpeechConfig() {
  return getAppConfig().speech;
}

export function getTrainingConfig() {
  return getAppConfig().training;
}

export function getUIConfig() {
  return getAppConfig().ui;
}

export function getApiConfig() {
  return getAppConfig().api;
}

// =============================================================================
// 型安全な環境変数アクセサ
// =============================================================================

/**
 * 型安全な環境変数取得
 */
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`環境変数 ${key} が設定されていません`);
  }
  return value;
}

/**
 * boolean型の環境変数取得
 */
export function getEnvBool(key: string, defaultValue: boolean = false): boolean {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value.toLowerCase() === 'true';
}

/**
 * number型の環境変数取得
 */
export function getEnvNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`環境変数 ${key} が設定されていません`);
  }
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`環境変数 ${key} は数値ではありません: ${value}`);
  }
  return parsed;
}

// =============================================================================
// 設定検証
// =============================================================================

/**
 * 設定の有効性を検証する
 */
export function validateConfig(config: AppConfig): void {
  // 音声設定の検証
  if (config.audio.defaultVolume < 0 || config.audio.defaultVolume > 1) {
    throw new Error('音量は0から1の間で設定してください');
  }
  
  if (config.audio.cacheSize <= 0) {
    throw new Error('キャッシュサイズは正の数で設定してください');
  }
  
  if (config.audio.cacheTTL <= 0) {
    throw new Error('キャッシュTTLは正の数で設定してください');
  }
  
  // 音声認識設定の検証
  if (config.speech.confidenceThreshold < 0 || config.speech.confidenceThreshold > 1) {
    throw new Error('信頼度闾値は0から1の間で設定してください');
  }
  
  // トレーニング設定の検証
  if (config.training.sessionTimeout <= 0) {
    throw new Error('セッションタイムアウトは正の数で設定してください');
  }
  
  if (config.training.responseTimeout <= 0) {
    throw new Error('レスポンスタイムアウトは正の数で設定してください');
  }
  
  // API設定の検証
  if (config.api.timeout <= 0) {
    throw new Error('APIタイムアウトは正の数で設定してください');
  }
  
  if (config.api.retryAttempts < 0) {
    throw new Error('リトライ回数は0以上で設定してください');
  }
}

// =============================================================================
// 設定オーバーライド
// =============================================================================

/**
 * 部分的な設定オーバーライド
 */
export function overrideConfig(
  baseConfig: AppConfig,
  overrides: Partial<AppConfig>
): AppConfig {
  return {
    audio: { ...baseConfig.audio, ...overrides.audio },
    speech: { ...baseConfig.speech, ...overrides.speech },
    training: { ...baseConfig.training, ...overrides.training },
    ui: { ...baseConfig.ui, ...overrides.ui },
    api: { ...baseConfig.api, ...overrides.api },
  };
}

// =============================================================================
// デフォルト設定のエクスポート
// =============================================================================

// メイン設定をエクスポート
const config = getAppConfig();

// 設定の検証
validateConfig(config);

export default config;

// コンポーネントで使いやすいように個別エクスポート
export const audioConfig = config.audio;
export const speechConfig = config.speech;
export const trainingConfig = config.training;
export const uiConfig = config.ui;
export const apiConfig = config.api;
