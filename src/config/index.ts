// Configuration for Task Manager App
// Toggle between API and local storage modes

export const CONFIG = {
  // Set to true to use REST API, false to use AsyncStorage only
  USE_API: true,

  // API Configuration
  API: {
    BASE_URL: 'http://localhost:3001',
    TIMEOUT: 5000, // 5 seconds
  },

  // Local Storage Configuration
  STORAGE: {
    KEY: '@taskmanager_tasks',
  },

  // App Configuration
  APP: {
    NAME: 'Task Manager',
    VERSION: '1.0.0',
  },
};

// Helper function to check if API is available
export const isApiAvailable = async (): Promise<boolean> => {
  if (!CONFIG.USE_API) return false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);

    const response = await fetch(`${CONFIG.API.BASE_URL}/tasks`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    console.log('API not available, falling back to local storage');
    return false;
  }
};
