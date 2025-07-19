import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User, UserPreferences } from '@/lib/types/common';

interface AppStoreState extends AppState {
  preferences: UserPreferences;
}

interface AppActions {
  // グローバル状態管理
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  // ユーザー管理
  setUser: (user: User | null) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
}

type AppStore = AppStoreState & AppActions;

const defaultPreferences: UserPreferences = {
  audioSpeed: 'normal',
  language: 'ja',
  theme: 'light',
  notifications: true,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // 初期状態
      isLoading: false,
      error: null,
      user: null,
      preferences: defaultPreferences,

      // アクション
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      setError: (error: string | null) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      setUser: (user: User | null) => set({ user }),
      
      updatePreferences: (newPreferences: Partial<UserPreferences>) =>
        set(state => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
      }),
    }
  )
);