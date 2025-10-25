import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Portal, FAB } from 'react-native-paper';
import TaskItem from './TaskItem';
import { EmptyState } from './EmptyState';
import { Task } from '../types';
import { Theme } from '../utils/theme';

interface TaskListProps {
  tasks: Task[];
  refreshing: boolean;
  showAddForm: boolean;
  onRefresh: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (
    id: string,
    text: string,
    priority: import('../types').Priority
  ) => void;
  onToggleAddForm: () => void;
  theme: Theme;
}

/**
 * Reusable task list component with FAB
 * Encapsulates list rendering and floating action button logic
 */
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  refreshing,
  showAddForm,
  onRefresh,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onToggleAddForm,
  theme,
}) => {
  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={onToggleTask}
      onDelete={onDeleteTask}
      onEdit={onEditTask}
      theme={theme}
    />
  );

  return (
    <>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<EmptyState theme={theme} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Portal>
        <FAB
          icon={showAddForm ? 'close' : 'plus'}
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={onToggleAddForm}
          accessibilityLabel={
            showAddForm ? 'Close add task form' : 'Add new task'
          }
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
