import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { Task, TaskStore, FilterState, Priority, FilterStatus } from '../types';
import { taskApiService, ApiTask } from '../services/apiService';

const STORAGE_KEY = '@taskmanager_tasks';

// Convert API task to internal task format
const convertApiTaskToTask = (apiTask: ApiTask): Task => ({
  id: apiTask.id,
  text: apiTask.text,
  completed: apiTask.completed,
  priority: apiTask.priority,
  createdAt: new Date(apiTask.createdAt),
});

// Convert internal task to API task format
const convertTaskToApiTask = (task: Task): ApiTask => ({
  id: task.id,
  text: task.text,
  completed: task.completed,
  priority: task.priority,
  createdAt: task.createdAt.toISOString(),
});

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filters: {
    status: 'All',
    priority: 'All',
  },

  addTask: async (text: string, priority: Priority) => {
    try {
      // Create task via API
      const apiTask = await taskApiService.createTask({
        text: text.trim(),
        priority,
        completed: false,
      });
      
      const newTask = convertApiTaskToTask(apiTask);
      
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));

      // Also save to AsyncStorage as backup
      get().saveTasks();
    } catch (error) {
      console.error('Error creating task via API, falling back to local storage:', error);
      
      // Fallback to local storage if API fails
      const newTask: Task = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        priority,
        createdAt: new Date(),
      };

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));

      get().saveTasks();
    }
  },

  toggleTask: async (id: string) => {
    const task = get().tasks.find(t => t.id === id);
    if (!task) return;

    try {
      // Update task via API
      const apiTask = await taskApiService.patchTask(id, {
        completed: !task.completed,
      });
      
      const updatedTask = convertApiTaskToTask(apiTask);
      
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? updatedTask : t
        ),
      }));

      // Also save to AsyncStorage as backup
      get().saveTasks();
    } catch (error) {
      console.error('Error updating task via API, falling back to local storage:', error);
      
      // Fallback to local storage if API fails
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      }));

      get().saveTasks();
    }
  },

  deleteTask: async (id: string) => {
    try {
      // Delete task via API
      await taskApiService.deleteTask(id);
      
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));

      // Also save to AsyncStorage as backup
      get().saveTasks();
    } catch (error) {
      console.error('Error deleting task via API, falling back to local storage:', error);
      
      // Fallback to local storage if API fails
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));

      get().saveTasks();
    }
  },

  editTask: async (id: string, text: string, priority: Priority) => {
    try {
      // Update task via API
      const apiTask = await taskApiService.patchTask(id, {
        text: text.trim(),
        priority,
      });
      
      const updatedTask = convertApiTaskToTask(apiTask);
      
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? updatedTask : t
        ),
      }));

      // Also save to AsyncStorage as backup
      get().saveTasks();
    } catch (error) {
      console.error('Error updating task via API, falling back to local storage:', error);
      
      // Fallback to local storage if API fails
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, text: text.trim(), priority } : t
        ),
      }));

      get().saveTasks();
    }
  },

  setStatusFilter: (status: FilterStatus) => {
    set((state) => ({
      filters: { ...state.filters, status },
    }));
  },

  setPriorityFilter: (priority: Priority | 'All') => {
    set((state) => ({
      filters: { ...state.filters, priority },
    }));
  },

  clearCompleted: async () => {
    const completedTasks = get().tasks.filter(task => task.completed);
    
    try {
      // Delete all completed tasks via API
      await Promise.all(
        completedTasks.map(task => taskApiService.deleteTask(task.id))
      );
      
      set((state) => ({
        tasks: state.tasks.filter((task) => !task.completed),
      }));

      // Also save to AsyncStorage as backup
      get().saveTasks();
    } catch (error) {
      console.error('Error clearing completed tasks via API, falling back to local storage:', error);
      
      // Fallback to local storage if API fails
      set((state) => ({
        tasks: state.tasks.filter((task) => !task.completed),
      }));

      get().saveTasks();
    }
  },

  loadTasks: async () => {
    try {
      // Try to load from API first
      const apiTasks = await taskApiService.getTasks();
      const tasks = apiTasks.map(convertApiTaskToTask);
      
      set({ tasks });
      
      // Also save to AsyncStorage as backup
      get().saveTasks();
    } catch (error) {
      console.error('Error loading tasks from API, falling back to AsyncStorage:', error);
      
      // Fallback to AsyncStorage if API fails
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
          }));
          set({ tasks: parsedTasks });
        }
      } catch (storageError) {
        console.error('Error loading tasks from AsyncStorage:', storageError);
      }
    }
  },

  saveTasks: async () => {
    try {
      const { tasks } = get();
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  },
}));

export default useTaskStore;
