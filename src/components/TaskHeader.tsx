import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import useThemeStore from '../store/themeStore';
import { Theme } from '../utils/theme';

interface TaskHeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onClearCompleted: () => void;
}

/**
 * Reusable header component for task screen
 * Encapsulates header logic and styling
 */
export const TaskHeader: React.FC<TaskHeaderProps> = ({
  theme,
  onToggleTheme,
  onClearCompleted,
}) => {
  const { isDarkMode } = useThemeStore();

  return (
    <Appbar.Header
      style={[styles.header, { backgroundColor: theme.colors.surface }]}
    >
      <Appbar.Content
        title="Task Manager"
        titleStyle={[styles.title, { color: theme.colors.text }]}
      />
      <Appbar.Action
        icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
        onPress={onToggleTheme}
        accessibilityLabel="Toggle theme"
      />
      <Appbar.Action
        icon="delete-outline"
        onPress={onClearCompleted}
        accessibilityLabel="Clear completed tasks"
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  title: {
    fontWeight: '600',
  },
});
