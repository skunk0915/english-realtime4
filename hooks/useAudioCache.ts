import { useRef, useCallback, useEffect } from 'react';

interface AudioCacheEntry {
  blob: Blob;
  url: string;
  timestamp: number;
  accessCount: number;
}

interface UseAudioCacheOptions {
  maxSizeMB?: number;
  maxEntries?: number;
}

interface UseAudioCacheReturn {
  getCachedAudio: (key: string) => string | null;
  setCachedAudio: (key: string, blob: Blob) => string;
  clearCache: () => void;
  getCacheStats: () => {
    entryCount: number;
    totalSizeMB: number;
  };
}

export const useAudioCache = (options: UseAudioCacheOptions = {}): UseAudioCacheReturn => {
  const { maxSizeMB = 50, maxEntries = 100 } = options;
  
  const cache = useRef<Map<string, AudioCacheEntry>>(new Map());

  // キャッシュサイズの計算
  const calculateCacheSize = useCallback((): number => {
    let totalSize = 0;
    cache.current.forEach(entry => {
      totalSize += entry.blob.size;
    });
    return totalSize / (1024 * 1024); // MB単位
  }, []);

  // LRU方式で古いエントリを削除
  const evictOldest = useCallback(() => {
    if (cache.current.size === 0) return;

    // アクセス時間順でソート（古いものから）
    const entries = Array.from(cache.current.entries()).sort(
      ([, a], [, b]) => a.timestamp - b.timestamp
    );

    // 最も古いエントリを削除
    if (entries.length > 0) {
      const [oldestKey, oldestEntry] = entries[0];
      URL.revokeObjectURL(oldestEntry.url);
      cache.current.delete(oldestKey);
    }
  }, []);

  // サイズ制限チェックと調整
  const enforceLimit = useCallback(() => {
    // エントリ数制限
    while (cache.current.size > maxEntries) {
      evictOldest();
    }

    // サイズ制限
    while (calculateCacheSize() > maxSizeMB && cache.current.size > 0) {
      evictOldest();
    }
  }, [maxEntries, maxSizeMB, evictOldest, calculateCacheSize]);

  // キャッシュから音声を取得
  const getCachedAudio = useCallback((key: string): string | null => {
    const entry = cache.current.get(key);
    if (entry) {
      // アクセス時間とカウントを更新
      entry.timestamp = Date.now();
      entry.accessCount += 1;
      return entry.url;
    }
    return null;
  }, []);

  // キャッシュに音声を保存
  const setCachedAudio = useCallback((key: string, blob: Blob): string => {
    // 既存のエントリがあれば削除
    const existingEntry = cache.current.get(key);
    if (existingEntry) {
      URL.revokeObjectURL(existingEntry.url);
    }

    // 新しいエントリを作成
    const url = URL.createObjectURL(blob);
    const entry: AudioCacheEntry = {
      blob,
      url,
      timestamp: Date.now(),
      accessCount: 1,
    };

    cache.current.set(key, entry);

    // 制限チェック
    enforceLimit();

    return url;
  }, [enforceLimit]);

  // キャッシュをクリア
  const clearCache = useCallback(() => {
    cache.current.forEach(entry => {
      URL.revokeObjectURL(entry.url);
    });
    cache.current.clear();
  }, []);

  // キャッシュ統計を取得
  const getCacheStats = useCallback(() => {
    return {
      entryCount: cache.current.size,
      totalSizeMB: Number(calculateCacheSize().toFixed(2)),
    };
  }, [calculateCacheSize]);

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return () => {
      clearCache();
    };
  }, [clearCache]);

  return {
    getCachedAudio,
    setCachedAudio,
    clearCache,
    getCacheStats,
  };
};