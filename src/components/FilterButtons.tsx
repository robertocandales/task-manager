import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { FilterStatus, Priority } from '../types';
import { Theme } from '../utils/theme';

interface FilterButtonsProps {
  statusFilter: FilterStatus;
  priorityFilter: Priority | 'All';
  onStatusChange: (status: FilterStatus) => void;
  onPriorityChange: (priority: Priority | 'All') => void;
  taskCounts: { total: number; completed: number; pending: number };
  theme: Theme;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
  taskCounts,
  theme,
}) => {
  const statusButtons = [
    {
      value: 'All',
      label: `All (${taskCounts.total})`,
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
    {
      value: 'Pending',
      label: `Pending (${taskCounts.pending})`,
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
    {
      value: 'Completed',
      label: `Completed (${taskCounts.completed})`,
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
  ];

  const priorityButtons = [
    {
      value: 'All',
      label: 'All',
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
    {
      value: 'High',
      label: 'High',
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
    {
      value: 'Medium',
      label: 'Medium',
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
    {
      value: 'Low',
      label: 'Low',
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.statusContainer}>
        <SegmentedButtons
          value={statusFilter}
          onValueChange={value => onStatusChange(value as FilterStatus)}
          buttons={statusButtons}
          style={styles.statusButtons}
          theme={{
            colors: {
              primary: theme.colors.primary,
              surface: theme.colors.surface,
              onSurface: theme.colors.onSurface,
              outline: theme.colors.outline,
              surfaceVariant: theme.colors.surfaceVariant,
              onSurfaceVariant: theme.colors.onSurfaceVariant,
              secondaryContainer: theme.colors.secondaryContainer,
              onSecondaryContainer: theme.colors.onSecondaryContainer,
            },
          }}
        />
      </View>

      <View style={styles.priorityContainer}>
        <SegmentedButtons
          value={priorityFilter}
          onValueChange={value => onPriorityChange(value as Priority | 'All')}
          buttons={priorityButtons}
          style={styles.priorityButtons}
          theme={{
            colors: {
              primary: theme.colors.primary,
              surface: theme.colors.surface,
              onSurface: theme.colors.onSurface,
              outline: theme.colors.outline,
              surfaceVariant: theme.colors.surfaceVariant,
              onSurfaceVariant: theme.colors.onSurfaceVariant,
              secondaryContainer: theme.colors.secondaryContainer,
              onSecondaryContainer: theme.colors.onSecondaryContainer,
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statusContainer: {
    marginBottom: 12,
  },
  statusButtons: {
    backgroundColor: 'transparent',
  },
  priorityContainer: {
    marginBottom: 0,
  },
  priorityButtons: {
    backgroundColor: 'transparent',
  },
});

export default FilterButtons;
