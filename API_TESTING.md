# API Testing Guide

## 🚀 Quick Start

1. **Start the API server**:

   ```bash
   npm run api
   ```

   Server will run on: `http://localhost:3001`

2. **Test the API** using curl, Postman, or your browser:

## 📋 Available Endpoints

### Get All Tasks

```bash
curl http://localhost:3001/tasks
```

### Get Task by ID

```bash
curl http://localhost:3001/tasks/1
```

### Create New Task

```bash
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Learn React Native",
    "priority": "High",
    "completed": false
  }'
```

### Update Task

```bash
curl -X PUT http://localhost:3001/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Complete React Native Task Manager",
    "priority": "High",
    "completed": true
  }'
```

### Partial Update Task

```bash
curl -X PATCH http://localhost:3001/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete Task

```bash
curl -X DELETE http://localhost:3001/tasks/1
```

## 🔍 Filtering & Sorting

### Filter by Completion Status

```bash
curl http://localhost:3001/tasks?completed=true
curl http://localhost:3001/tasks?completed=false
```

### Filter by Priority

```bash
curl http://localhost:3001/tasks?priority=High
curl http://localhost:3001/tasks?priority=Medium
curl http://localhost:3001/tasks?priority=Low
```

### Sort by Creation Date

```bash
curl http://localhost:3001/tasks?_sort=createdAt&_order=desc
curl http://localhost:3001/tasks?_sort=createdAt&_order=asc
```

### Combined Filters

```bash
curl http://localhost:3001/tasks?completed=false&priority=High
curl http://localhost:3001/tasks?completed=true&_sort=createdAt&_order=desc
```

## 🌐 Browser Testing

You can also test the API directly in your browser:

- **All tasks**: http://localhost:3001/tasks
- **Specific task**: http://localhost:3001/tasks/1
- **Filtered tasks**: http://localhost:3001/tasks?completed=false

## 📊 Sample Data

The API comes pre-loaded with 5 sample tasks:

1. "Complete React Native Task Manager" (High, Pending)
2. "Review code architecture" (Medium, Completed)
3. "Write documentation" (Low, Pending)
4. "Setup json-server for API testing" (High, Completed)
5. "Implement dark mode toggle" (Medium, Completed)

## 🔧 Integration with React Native

The complete API service is available in `src/services/apiService.ts` and can be integrated with the Zustand store for real API calls instead of AsyncStorage.

### Example Integration:

```typescript
import { taskApiService } from '../services/apiService';

// In your store
const loadTasksFromAPI = async () => {
  try {
    const tasks = await taskApiService.getTasks();
    set({ tasks });
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
};
```

This demonstrates modern development practices with:

- ✅ Mock API for development
- ✅ Complete REST API integration
- ✅ Error handling
- ✅ TypeScript support
- ✅ Real-world API patterns
