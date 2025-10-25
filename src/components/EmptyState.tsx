import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { Theme } from '../utils/theme';

interface EmptyStateProps {
  theme: Theme;
}

/**
 * Reusable empty state component
 * Displays when no tasks are found
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ theme }) => (
  <View style={styles.emptyContainer}>
    <IconButton
      icon="check-all"
      size={48}
      iconColor={theme.colors.textSecondary}
    />
    <Appbar.Content
      title="No tasks found"
      titleStyle={[styles.emptyTitle, { color: theme.colors.textSecondary }]}
    />
    <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
      Add a new task to get started!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
