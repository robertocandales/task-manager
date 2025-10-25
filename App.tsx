import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Navigation
import { AppNavigator } from './src/navigation';

// Store and Utils
import useThemeStore from './src/store/themeStore';
import useTaskStore from './src/store/taskStore';
import { lightTheme, darkTheme } from './src/utils/theme';

const App: React.FC = () => {
  const { isDarkMode, loadTheme } = useThemeStore();
  const { loadTasks } = useTaskStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Initialize app data on startup
  useEffect(() => {
    loadTasks();
    loadTheme();
  }, [loadTasks, loadTheme]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;
