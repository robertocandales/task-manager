import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Appbar, FAB, Portal, IconButton, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import AddTaskForm from '../components/AddTaskForm';
import TaskItem from '../components/TaskItem';
import FilterButtons from '../components/FilterButtons';
import TaskCounter from '../components/TaskCounter';
import ApiStatus from '../components/ApiStatus';

// Store and Utils
import useTaskStore from '../store/taskStore';
import useThemeStore from '../store/themeStore';
import {
  filterTasks,
  getTaskCounts,
  sortTasksByPriority,
} from '../utils/taskUtils';
import { lightTheme, darkTheme, Theme } from '../utils/theme';
import { Task, Priority } from '../types';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TaskScreen: React.FC = () => {
  const {
    tasks,
    filters,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setStatusFilter,
    setPriorityFilter,
    clearCompleted,
    loadTasks,
  } = useTaskStore();

  const { isDarkMode, toggleTheme, loadTheme } = useThemeStore();

  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const theme: Theme = isDarkMode ? darkTheme : lightTheme;

  // Load tasks and theme on app start
  useEffect(() => {
    loadTasks();
    loadTheme();
  }, [loadTasks, loadTheme]);

  // Filter and sort tasks
  const filteredTasks = sortTasksByPriority(filterTasks(tasks, filters));
  const taskCounts = getTaskCounts(tasks);

  const handleAddTask = (text: string, priority: Priority) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    addTask(text, priority);
    setShowAddForm(false);
  };

  const handleCancelAddTask = () => {
    setShowAddForm(false);
  };

  const handleToggleTask = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTask(id);
  };

  const handleDeleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          deleteTask(id);
        },
      },
    ]);
  };

  const handleEditTask = (id: string, text: string, priority: Priority) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    editTask(id, text, priority);
  };

  const handleClearCompleted = () => {
    if (taskCounts.completed === 0) {
      Alert.alert(
        'No Completed Tasks',
        'There are no completed tasks to clear.'
      );
      return;
    }

    Alert.alert(
      'Clear Completed Tasks',
      `Are you sure you want to delete ${taskCounts.completed} completed task(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            clearCompleted();
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
      onEdit={handleEditTask}
      theme={theme}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconButton
        icon="check-all"
        size={48}
        iconColor={theme.colors.textSecondary}
      />
      <Appbar.Content
        title="No tasks found"
        titleStyle={[styles.emptyTitle, { color: theme.colors.textSecondary }]}
      />
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        Add a new task to get started!
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.Content
          title="Task Manager"
          titleStyle={{ color: theme.colors.text }}
        />
        <Appbar.Action
          icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
          onPress={toggleTheme}
        />
        <Appbar.Action icon="delete-outline" onPress={handleClearCompleted} />
      </Appbar.Header>

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

      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Portal>
        <FAB
          icon={showAddForm ? 'close' : 'plus'}
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={() => setShowAddForm(!showAddForm)}
        />
      </Portal>

      {showAddForm && (
        <Modal
          visible={showAddForm}
          onDismiss={handleCancelAddTask}
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
            onAddTask={handleAddTask}
            onCancel={handleCancelAddTask}
            theme={theme}
          />
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
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
