import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  loadTheme: () => Promise<void>;
  saveTheme: () => Promise<void>;
}

const THEME_STORAGE_KEY = '@taskmanager_theme';

const useThemeStore = create<ThemeStore>((set, get) => ({
  isDarkMode: false,

  toggleTheme: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
    get().saveTheme();
  },

  loadTheme: async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme) {
        set({ isDarkMode: JSON.parse(storedTheme) });
      }
    } catch (error) {
      console.error('Error loading theme from AsyncStorage:', error);
    }
  },

  saveTheme: async () => {
    try {
      const { isDarkMode } = get();
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Error saving theme to AsyncStorage:', error);
    }
  },
}));

export default useThemeStore;
