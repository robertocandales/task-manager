import { useState, useCallback } from 'react';
import useTaskStore from '../store/taskStore';

/**
 * Custom hook for managing modal state and refresh functionality
 * Encapsulates UI state management logic
 */
export const useTaskScreenState = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { loadTasks } = useTaskStore();

  const handleShowAddForm = useCallback(() => {
    setShowAddForm(true);
  }, []);

  const handleHideAddForm = useCallback(() => {
    setShowAddForm(false);
  }, []);

  const handleToggleAddForm = useCallback(() => {
    setShowAddForm(prev => !prev);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  }, [loadTasks]);

  return {
    refreshing,
    showAddForm,
    handleShowAddForm,
    handleHideAddForm,
    handleToggleAddForm,
    onRefresh,
  };
};
