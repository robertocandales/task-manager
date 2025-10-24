import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { Priority } from '../types';
import { Theme } from '../utils/theme';

interface AddTaskFormProps {
  onAddTask: (text: string, priority: Priority) => void;
  onCancel: () => void;
  theme: Theme;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, onCancel, theme }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');

  const handleAddTask = () => {
    const trimmedText = taskText.trim();
    
    if (!trimmedText) {
      Alert.alert(
        'Empty Task',
        'Please enter a task description before adding.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    onAddTask(trimmedText, priority);
    setTaskText('');
    setPriority('Medium');
  };

  const handleCancel = () => {
    setTaskText('');
    setPriority('Medium');
    onCancel();
  };

  const priorityButtons = [
    {
      value: 'Low',
      label: 'Low',
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
    {
      value: 'Medium',
      label: 'Medium',
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
    {
      value: 'High',
      label: 'High',
      checkedColor: theme.colors.onSecondaryContainer,
      uncheckedColor: theme.colors.onSurface,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TextInput
        label="Add a new task"
        value={taskText}
        onChangeText={setTaskText}
        style={styles.input}
        mode="outlined"
        multiline
        maxLength={200}
        placeholder="What needs to be done?"
        theme={{
          colors: {
            primary: theme.colors.primary,
            background: theme.colors.background,
            surface: theme.colors.surface,
            text: theme.colors.text,
            onSurface: theme.colors.text,
            outline: theme.colors.border,
          },
        }}
      />
      
      <View style={styles.priorityContainer}>
        <SegmentedButtons
          value={priority}
          onValueChange={(value) => setPriority(value as Priority)}
          buttons={priorityButtons}
          style={styles.priorityButtons}
          theme={{
            colors: {
              primary: theme.colors.primary,
              surface: theme.colors.surface,
              onSurface: theme.colors.onSurface,
              outline: theme.colors.outline,
              surfaceVariant: theme.colors.surfaceVariant,
              onSurfaceVariant: theme.colors.onSurfaceVariant,
              secondaryContainer: theme.colors.secondaryContainer,
              onSecondaryContainer: theme.colors.onSecondaryContainer,
            },
          }}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={handleCancel}
          style={[styles.cancelButton, { borderColor: theme.colors.border }]}
          textColor={theme.colors.text}
          theme={{
            colors: {
              primary: theme.colors.text,
              surface: theme.colors.surface,
              onSurface: theme.colors.text,
              outline: theme.colors.border,
            },
          }}
        >
          Cancel
        </Button>
        
        <Button
          mode="contained"
          onPress={handleAddTask}
          style={styles.addButton}
          icon="plus"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.surface}
        >
          Add Task
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    marginBottom: 16,
  },
  priorityContainer: {
    marginBottom: 16,
  },
  priorityButtons: {
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 8,
  },
  addButton: {
    flex: 1,
    borderRadius: 8,
  },
});

export default AddTaskForm;
