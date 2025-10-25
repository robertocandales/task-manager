import { useCallback } from 'react';
import { Alert, LayoutAnimation } from 'react-native';
import useTaskStore from '../store/taskStore';
import { getTaskCounts } from '../utils/taskUtils';
import { Priority } from '../types';

/**
 * Custom hook for task operations with animations and confirmations
 * Separates business logic from UI components
 */
export const useTaskOperations = () => {
  const { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted } =
    useTaskStore();

  // Compute task counts directly here to avoid circular dependency
  const taskCounts = getTaskCounts(tasks || []);

  const handleAddTask = useCallback(
    (text: string, priority: Priority) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      addTask(text, priority);
    },
    [addTask]
  );

  const handleToggleTask = useCallback(
    (id: string) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      toggleTask(id);
    },
    [toggleTask]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            deleteTask(id);
          },
        },
      ]);
    },
    [deleteTask]
  );

  const handleEditTask = useCallback(
    (id: string, text: string, priority: Priority) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      editTask(id, text, priority);
    },
    [editTask]
  );

  const handleClearCompleted = useCallback(() => {
    if (taskCounts.completed === 0) {
      Alert.alert(
        'No Completed Tasks',
        'There are no completed tasks to clear.'
      );
      return;
    }

    Alert.alert(
      'Clear Completed Tasks',
      `Are you sure you want to delete ${taskCounts.completed} completed task(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            clearCompleted();
          },
        },
      ]
    );
  }, [clearCompleted, tasks]);

  return {
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
    handleClearCompleted,
  };
};
