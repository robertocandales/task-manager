# Task Manager App

A modern React Native task management application built with Expo, featuring comprehensive task management capabilities, dark mode support, and smooth animations.

## 🚀 Features

### Core Requirements ✅

- **Add Tasks**: Text input with priority selection and validation
- **Task List**: Display tasks with checkboxes, delete buttons, and priority badges
- **Filtering System**: Filter by status (All, Completed, Pending) and priority (High, Medium, Low)
- **Data Persistence**: AsyncStorage integration with error handling
- **Global State Management**: Zustand store for efficient state management

### Bonus Features ✨

- **Dark Mode Toggle**: Complete theme switching with persistent preferences
- **Smooth Animations**: LayoutAnimation for adding/removing tasks
- **Pull-to-Refresh**: Refresh functionality for task list
- **Task Counter**: Real-time statistics showing total, pending, completed tasks and completion percentage
- **Modern UI**: Material Design components with React Native Paper
- **Responsive Design**: Optimized for both iOS and Android

## 📱 Screenshots

The app features a clean, modern interface with:

- Task counter dashboard
- Filter controls for status and priority
- Individual task items with priority indicators
- Floating action button for adding tasks
- Dark/light mode toggle

## 🛠️ Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Zustand** for state management
- **React Native Paper** for UI components
- **AsyncStorage** for data persistence
- **React Native Reanimated** for animations

## 📦 Dependencies

```json
{
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-navigation/native": "^7.1.18",
  "@react-navigation/native-stack": "^7.5.1",
  "expo": "~54.0.20",
  "expo-status-bar": "~3.0.8",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-paper": "^5.14.5",
  "react-native-reanimated": "~4.1.1",
  "react-native-safe-area-context": "~5.6.0",
  "react-native-screens": "~4.16.0",
  "react-native-vector-icons": "^10.3.0",
  "zustand": "^5.0.8"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TaskManagerApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the mock API server**

   ```bash
   npm run api
   ```

   This will start json-server on `http://localhost:3001` with sample data.

4. **Start the development server** (in a new terminal)

   ```bash
   npm start
   ```

5. **Run both API and app simultaneously**

   ```bash
   npm run dev
   ```

6. **Run on specific platforms**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

### 🌐 Mock REST API

The project includes a **json-server** setup for testing and development:

- **API Endpoint**: `http://localhost:3001`
- **Sample Data**: Pre-loaded with 5 example tasks
- **Available Routes**:
  - `GET /tasks` - Get all tasks
  - `GET /tasks/:id` - Get specific task
  - `POST /tasks` - Create new task
  - `PUT /tasks/:id` - Update task
  - `PATCH /tasks/:id` - Partial update
  - `DELETE /tasks/:id` - Delete task
  - `GET /tasks?completed=true` - Filter by status
  - `GET /tasks?priority=High` - Filter by priority
  - `GET /tasks?_sort=createdAt&_order=desc` - Sort tasks

### 🌐 Mock REST API Integration

The project includes **full REST API integration** with automatic fallback:

- **Smart API Detection**: Automatically detects if json-server is running
- **Seamless Fallback**: Falls back to AsyncStorage if API is unavailable
- **Real-time Status**: Shows API connection status in the UI
- **Hybrid Storage**: Uses API as primary, AsyncStorage as backup
- **Error Handling**: Graceful error handling with user feedback

**API Features**:

- ✅ **CRUD Operations**: Create, Read, Update, Delete tasks
- ✅ **Real-time Sync**: Changes sync with API immediately
- ✅ **Offline Support**: Works without internet connection
- ✅ **Status Indicator**: Visual feedback on API connection
- ✅ **Automatic Retry**: Smart retry logic for failed requests

**API Service**: Complete REST API integration in `src/services/apiService.ts` with TypeScript support and error handling.

## 📁 Project Structure

```
TaskManagerApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AddTaskForm.tsx  # Task creation form
│   │   ├── TaskItem.tsx     # Individual task display
│   │   ├── FilterButtons.tsx # Filter controls
│   │   └── TaskCounter.tsx  # Statistics dashboard
│   ├── screens/            # Screen components (Business Logic)
│   │   ├── TaskScreen.tsx   # Main task management screen
│   │   └── index.ts         # Screen exports
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx # Main navigation setup
│   │   └── index.ts         # Navigation exports
│   ├── store/              # State management
│   │   ├── taskStore.ts     # Main task store (Zustand)
│   │   └── themeStore.ts    # Theme management
│   ├── types/               # TypeScript definitions
│   │   └── index.ts         # Type definitions
│   └── utils/               # Utility functions
│       ├── taskUtils.ts     # Task filtering and sorting
│       └── theme.ts         # Theme configurations
│   └── services/            # API services
│       ├── apiService.ts     # REST API integration
│       └── index.ts          # Service exports
├── App.tsx                  # Root component (Clean & Minimal)
├── db.json                  # Mock database for json-server
├── ARCHITECTURE.md          # Detailed architecture documentation
├── package.json
└── README.md
```

## 🏗️ Architecture Highlights

### **Clean Architecture Approach**

- **App.tsx**: Minimal root component focused only on providers and navigation
- **Screens**: Business logic separated from UI components
- **Navigation**: Centralized routing configuration for scalability
- **Components**: Pure UI components with clear separation of concerns
- **Store**: Global state management isolated from UI logic

### **Scalability Benefits**

- Easy to add new screens without modifying existing code
- Navigation can be extended with tabs, stacks, or drawers
- Components are reusable across different screens
- Store can be easily extended with new features
- Clear file organization for team collaboration

> 📖 **Detailed Architecture Documentation**: See [ARCHITECTURE.md](./ARCHITECTURE.md) for comprehensive explanation of design decisions and interview talking points.

## 🎯 State Management Choice: Zustand

I chose **Zustand** over Context API for the following reasons:

### Why Zustand?

- **Minimal Boilerplate**: Much less code compared to Context API
- **Better Performance**: No unnecessary re-renders
- **TypeScript Support**: Excellent type safety out of the box
- **DevTools Integration**: Easy debugging with Redux DevTools
- **Persistence**: Built-in support for AsyncStorage
- **Simplicity**: Easy to understand and maintain

### Implementation Details

- Single store for all task-related state
- Separate theme store for UI preferences
- Automatic persistence to AsyncStorage
- Optimized selectors to prevent unnecessary re-renders

## 🔧 Key Features Implementation

### Task Management

- **Add Tasks**: Form validation, priority selection, automatic clearing
- **Toggle Completion**: One-tap task completion with visual feedback
- **Delete Tasks**: Confirmation dialog with smooth animations
- **Bulk Operations**: Clear all completed tasks with confirmation

### Filtering System

- **Status Filters**: All, Completed, Pending with live counts
- **Priority Filters**: High, Medium, Low, All
- **Combined Filtering**: Both filters work together seamlessly
- **Real-time Updates**: Instant filtering without delays

### Data Persistence

- **AsyncStorage Integration**: Automatic save/load on app start
- **Error Handling**: Graceful fallback if storage fails
- **Performance**: Efficient serialization/deserialization
- **Data Integrity**: Proper date handling and validation

### Dark Mode

- **Complete Theme System**: All components support theming
- **Persistent Preferences**: Theme choice saved across app restarts
- **Smooth Transitions**: Instant theme switching
- **Accessibility**: High contrast colors for better readability

## 🎨 UI/UX Features

### Modern Design

- Material Design 3 components
- Consistent spacing and typography
- Smooth animations and transitions
- Responsive layout for different screen sizes

### User Experience

- Intuitive navigation with floating action button
- Clear visual hierarchy with priority indicators
- Confirmation dialogs for destructive actions
- Empty state with helpful messaging
- Pull-to-refresh functionality

### Accessibility

- High contrast colors in both themes
- Clear visual feedback for interactions
- Proper touch targets for mobile devices
- Screen reader friendly components

## 🐛 Known Issues & Limitations

- **iOS Simulator**: Some animations may appear different on iOS Simulator vs real device
- **Android Edge Cases**: Layout animations require additional configuration on older Android versions
- **Storage Limits**: AsyncStorage has size limits (typically 6MB), but this is sufficient for task data

## 🔮 Future Enhancements

- **Task Categories**: Add custom categories/tags
- **Due Dates**: Set and track task deadlines
- **Task Sharing**: Export/import task lists
- **Offline Sync**: Cloud synchronization when online
- **Widgets**: Home screen widgets for quick task access
- **Voice Input**: Add tasks using voice commands
- **Task Templates**: Save and reuse common task patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built as a React Native code challenge demonstrating modern mobile development practices, state management, and user experience design.

---

**Happy Task Managing! 🎉**
