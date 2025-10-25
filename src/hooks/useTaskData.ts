import { useMemo } from 'react';
import useTaskStore from '../store/taskStore';
import {
  filterTasks,
  getTaskCounts,
  sortTasksByPriority,
} from '../utils/taskUtils';

/**
 * Custom hook for task data processing and filtering
 * Separates data transformation logic from UI components
 */
export const useTaskData = () => {
  const { tasks, filters } = useTaskStore();

  const processedData = useMemo(() => {
    // Ensure tasks is always an array
    const safeTasks = tasks || [];

    const filteredTasks = sortTasksByPriority(filterTasks(safeTasks, filters));
    const taskCounts = getTaskCounts(safeTasks);

    return {
      filteredTasks,
      taskCounts,
    };
  }, [tasks, filters]);

  return processedData;
};
