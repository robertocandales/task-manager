export type Priority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'completed' | 'pending';

export type FilterStatus = 'All' | 'Completed' | 'Pending';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

export interface FilterState {
  status: FilterStatus;
  priority: Priority | 'All';
}

export interface TaskStore {
  tasks: Task[];
  filters: FilterState;
  addTask: (text: string, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, text: string, priority: Priority) => void;
  setStatusFilter: (status: FilterStatus) => void;
  setPriorityFilter: (priority: Priority | 'All') => void;
  clearCompleted: () => void;
  loadTasks: () => Promise<void>;
  saveTasks: () => Promise<void>;
}
