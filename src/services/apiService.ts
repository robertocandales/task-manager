/* eslint-disable no-console */
// API Service for Task Management
// This demonstrates how to integrate with a REST API using json-server

const API_BASE_URL = 'http://localhost:3001';

export interface ApiTask {
  id: string;
  text: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
}

export interface CreateTaskRequest {
  text: string;
  priority: 'High' | 'Medium' | 'Low';
  completed?: boolean;
}

export interface UpdateTaskRequest {
  text?: string;
  priority?: 'High' | 'Medium' | 'Low';
  completed?: boolean;
}

class TaskApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // GET /tasks - Get all tasks
  async getTasks(): Promise<ApiTask[]> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  // GET /tasks/:id - Get a specific task
  async getTask(id: string): Promise<ApiTask> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  }

  // POST /tasks - Create a new task
  async createTask(task: CreateTaskRequest): Promise<ApiTask> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...task,
          completed: task.completed || false,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  // PUT /tasks/:id - Update a task
  async updateTask(id: string, updates: UpdateTaskRequest): Promise<ApiTask> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  }

  // PATCH /tasks/:id - Partial update a task
  async patchTask(id: string, updates: UpdateTaskRequest): Promise<ApiTask> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error patching task ${id}:`, error);
      throw error;
    }
  }

  // DELETE /tasks/:id - Delete a task
  async deleteTask(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  }

  // GET /tasks?completed=true - Filter tasks by completion status
  async getTasksByStatus(completed: boolean): Promise<ApiTask[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tasks?completed=${completed}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching tasks by status ${completed}:`, error);
      throw error;
    }
  }

  // GET /tasks?priority=High - Filter tasks by priority
  async getTasksByPriority(
    priority: 'High' | 'Medium' | 'Low'
  ): Promise<ApiTask[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tasks?priority=${priority}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching tasks by priority ${priority}:`, error);
      throw error;
    }
  }

  // GET /tasks?_sort=createdAt&_order=desc - Sort tasks by creation date
  async getTasksSorted(
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'desc'
  ): Promise<ApiTask[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/tasks?_sort=${sortBy}&_order=${order}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching sorted tasks:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const taskApiService = new TaskApiService();

// Export class for testing or multiple instances
export default TaskApiService;
