import { Task, FilterState } from '../types';

export const filterTasks = (tasks: Task[], filters: FilterState): Task[] => {
  return tasks.filter((task) => {
    // Filter by status
    const statusMatch =
      filters.status === 'All' ||
      (filters.status === 'Completed' && task.completed) ||
      (filters.status === 'Pending' && !task.completed);

    // Filter by priority
    const priorityMatch =
      filters.priority === 'All' || task.priority === filters.priority;

    return statusMatch && priorityMatch;
  });
};

export const getTaskCounts = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return { total, completed, pending };
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  
  return [...tasks].sort((a, b) => {
    // First sort by completion status (pending first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by priority
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};
