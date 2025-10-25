import React from 'react';
import { StyleSheet, Platform, UIManager } from 'react-native';
import { Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import AddTaskForm from '../components/AddTaskForm';
import { TaskList } from '../components/TaskList';
import FilterButtons from '../components/FilterButtons';
import TaskCounter from '../components/TaskCounter';
import ApiStatus from '../components/ApiStatus';
import { TaskHeader } from '../components/TaskHeader';

// Custom Hooks
import { useTaskOperations, useTaskScreenState, useTaskData } from '../hooks';

// Store and Utils
import useTaskStore from '../store/taskStore';
import useThemeStore from '../store/themeStore';
import { lightTheme, darkTheme, Theme } from '../utils/theme';
import { Priority } from '../types';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Main Task Screen Component
 *
 * Architecture:
 * - Uses custom hooks to separate business logic from UI
 * - Composed of smaller, reusable components
 * - Follows single responsibility principle
 * - Clean separation of concerns
 */
const TaskScreen: React.FC = () => {
  // Custom hooks for separated concerns
  const { filteredTasks, taskCounts } = useTaskData();
  const {
    refreshing,
    showAddForm,
    handleHideAddForm,
    handleToggleAddForm,
    onRefresh,
  } = useTaskScreenState();
  const {
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
    handleClearCompleted,
  } = useTaskOperations();

  // Store hooks for direct state access
  const { filters, setStatusFilter, setPriorityFilter } = useTaskStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const theme: Theme = isDarkMode ? darkTheme : lightTheme;

  // Enhanced add task handler that closes modal
  const handleAddTaskWithClose = (text: string, priority: Priority) => {
    handleAddTask(text, priority);
    handleHideAddForm();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TaskHeader
        theme={theme}
        onToggleTheme={toggleTheme}
        onClearCompleted={handleClearCompleted}
      />

      <TaskCounter
        total={taskCounts.total}
        completed={taskCounts.completed}
        pending={taskCounts.pending}
        theme={theme}
      />

      <ApiStatus theme={theme} />

      <FilterButtons
        statusFilter={filters.status}
        priorityFilter={filters.priority}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        taskCounts={taskCounts}
        theme={theme}
      />

      <TaskList
        tasks={filteredTasks}
        refreshing={refreshing}
        showAddForm={showAddForm}
        onRefresh={onRefresh}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        onToggleAddForm={handleToggleAddForm}
        theme={theme}
      />

      {/* Add Task Modal */}

      <Modal
        visible={showAddForm}
        onDismiss={handleHideAddForm}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.surface },
        ]}
        theme={{
          colors: {
            backdrop: 'rgba(0, 0, 0, 0.5)',
            surface: theme.colors.surface,
          },
        }}
      >
        <AddTaskForm
          onAddTask={handleAddTaskWithClose}
          onCancel={handleHideAddForm}
          theme={theme}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    padding: 0,
    margin: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default TaskScreen;
