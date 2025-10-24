# 📱 Task Manager App

A modern, feature-rich React Native task management application built with TypeScript, demonstrating advanced mobile development practices and clean architecture principles.

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)
![Expo](https://img.shields.io/badge/Expo-54.0.20-black.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📱 Demo

<div align="center">
  <img src="https://github.com/user-attachments/assets/f9e939ab-21bc-4eb0-b920-d1c48fabe475" alt="Task Manager App Demo" width="300" />
</div>

## 🚀 Features

### Core Functionality

- ✅ **Task Management**: Create, edit, delete, and toggle task completion
- ✅ **Priority System**: High, Medium, Low priority levels with visual indicators
- ✅ **Smart Filtering**: Filter by status (All, Pending, Completed) and priority
- ✅ **Real-time Search**: Instant task filtering and sorting
- ✅ **Data Persistence**: Automatic save/load with AsyncStorage
- ✅ **REST API Integration**: Seamless API integration with local storage fallback

### Advanced Features

- 🎨 **Dark/Light Mode**: Complete theme switching with persistent preferences
- 🔄 **Pull-to-Refresh**: Refresh tasks with smooth animations
- 📊 **Task Statistics**: Live counters for total, completed, and pending tasks
- ✏️ **Inline Editing**: Edit tasks directly in the list with priority selection
- 🎭 **Smooth Animations**: Layout animations for task operations
- 🌐 **API Status Indicator**: Visual feedback for online/offline state
- 📱 **Responsive Design**: Optimized for both iOS and Android

### Developer Experience

- 🔧 **ESLint & Prettier**: Automated code quality and formatting
- 🐕 **Husky Pre-commit Hooks**: Enforced code standards
- 🏗️ **Clean Architecture**: Separation of concerns with organized folder structure
- 📝 **TypeScript**: Full type safety and IntelliSense support
- 🧪 **Mock API**: json-server for development and testing

## 🛠️ Tech Stack

### Frontend

- **React Native** 0.81.5 - Cross-platform mobile development
- **TypeScript** 5.9.2 - Type-safe JavaScript
- **Expo** 54.0.20 - Development platform and tools
- **React Native Paper** 5.14.5 - Material Design components
- **React Navigation** 7.x - Navigation library

### State Management & Data

- **Zustand** 5.0.8 - Lightweight state management
- **AsyncStorage** 2.2.0 - Local data persistence
- **json-server** 1.0.0-beta.3 - Mock REST API

### Development Tools

- **ESLint** 9.38.0 - Code linting and quality
- **Prettier** 3.6.2 - Code formatting
- **Husky** 9.1.7 - Git hooks management
- **lint-staged** 16.2.6 - Pre-commit linting

## 📁 Project Structure

```
TaskManagerApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AddTaskForm.tsx  # Task creation form
│   │   ├── TaskItem.tsx     # Individual task component
│   │   ├── FilterButtons.tsx # Task filtering controls
│   │   ├── TaskCounter.tsx  # Statistics display
│   │   └── ApiStatus.tsx    # API connection indicator
│   ├── screens/             # Screen components
│   │   └── TaskScreen.tsx   # Main task management screen
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx # App navigation setup
│   ├── store/               # State management
│   │   ├── taskStore.ts     # Main task store (smart API/local)
│   │   ├── taskStoreWithAPI.ts # API-specific store
│   │   ├── taskStoreLocal.ts # Local storage store
│   │   └── themeStore.ts    # Theme management
│   ├── services/            # API services
│   │   └── apiService.ts    # REST API client
│   ├── utils/               # Utility functions
│   │   ├── taskUtils.ts     # Task filtering/sorting logic
│   │   └── theme.ts         # Theme definitions
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared interfaces
│   └── config/              # Configuration
│       └── index.ts          # App configuration
├── .husky/                  # Git hooks
├── eslint.config.js         # ESLint configuration
├── .prettierrc              # Prettier configuration
├── db.json                  # Mock API database
└── README.md                # Project documentation
```

## 🏗️ Architecture Highlights

### Smart Store Pattern

The application implements a **hybrid storage system** that automatically detects API availability and switches between REST API and local storage:

```typescript
// Automatic API detection and fallback
const apiAvailable = await isApiAvailable();
if (apiAvailable && CONFIG.USE_API) {
  // Use REST API
  const apiTask = await taskApiService.createTask(taskData);
} else {
  // Fallback to AsyncStorage
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
```

### Clean Architecture Principles

- **Separation of Concerns**: Components, screens, navigation, and business logic are properly separated
- **Dependency Injection**: Services are injected through the store layer
- **Single Responsibility**: Each module has a clear, focused purpose
- **Testability**: Pure functions and isolated components for easy testing

### State Management Strategy

- **Zustand**: Chosen for its simplicity and TypeScript support
- **Persistence**: Automatic data persistence with error handling
- **Optimistic Updates**: Immediate UI updates with background sync
- **Error Recovery**: Graceful fallback mechanisms

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/taskmanagerapp.git
   cd taskmanagerapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on specific platforms**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

### Mock API Setup (Optional)

1. **Start the mock API server**

   ```bash
   npm run api
   ```

2. **Run with API integration**
   ```bash
   npm run dev
   ```

The app will automatically detect the API and use it for data operations.

## 📱 Usage

### Basic Operations

1. **Add Task**: Tap the + button to create a new task
2. **Edit Task**: Tap on any task text or the pencil icon to edit
3. **Complete Task**: Tap the checkbox to mark as complete
4. **Delete Task**: Tap the trash icon to remove a task
5. **Filter Tasks**: Use the filter buttons to view specific tasks

### Advanced Features

- **Theme Toggle**: Tap the sun/moon icon to switch themes
- **Clear Completed**: Tap the sweep icon to remove all completed tasks
- **Pull to Refresh**: Pull down on the task list to refresh data
- **Priority Selection**: Choose task priority when creating or editing

## 🧪 Testing

### Manual Testing

- **API Integration**: Test with and without the mock API running
- **Theme Persistence**: Verify theme preference is saved between sessions
- **Data Persistence**: Confirm tasks persist after app restart
- **Error Handling**: Test network failures and storage errors

### Code Quality

```bash
# Run linting
npm run lint

# Auto-fix issues
npm run lint:fix

# Check for errors only
npm run lint:check
```

## 🔧 Configuration

### ESLint Configuration

The project uses a comprehensive ESLint setup with:

- TypeScript support
- React Native specific rules
- React Hooks validation
- Import organization
- Code quality enforcement

### Prettier Configuration

Consistent code formatting with:

- Single quotes
- Semicolons
- 2-space indentation
- 80 character line width

## 📊 Performance Considerations

### Optimizations Implemented

- **FlatList**: Efficient rendering for large task lists
- **LayoutAnimation**: Smooth animations for task operations
- **Key Extractor**: Optimized FlatList performance with unique keys

### Memory Management

- **Efficient State Updates**: Zustand's immutable state updates
- **Smart API Fallback**: Automatic switching between API and local storage

## 🚀 Deployment

### Building for Production

1. **Configure app.json** with your app details
2. **Build for iOS**
   ```bash
   expo build:ios
   ```
3. **Build for Android**
   ```bash
   expo build:android
   ```

### App Store Submission

- Follow Expo's deployment guide
- Ensure all assets are optimized
- Test on physical devices
- Complete app store metadata

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Roberto Candales**

- GitHub: [@robertocandales](https://github.com/robertocandales)
- LinkedIn: [Roberto Candales](https://linkedin.com/in/robertocandales)

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for the amazing development platform
- React Native Paper for beautiful Material Design components
- Zustand for simple and effective state management

---

## 📞 Contact

For questions about this project or potential opportunities, please reach out:

- **Email**: roberto@example.com
- **LinkedIn**: [Roberto Candales](https://linkedin.com/in/robertocandales)
- **Portfolio**: [robertocandales.dev](https://robertocandales.dev)

---

<div align="center">
  <p>Built with ❤️ using React Native</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
