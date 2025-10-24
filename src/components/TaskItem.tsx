import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { IconButton, SegmentedButtons, TextInput } from 'react-native-paper';
import { Task, Priority } from '../types';
import { Theme } from '../utils/theme';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, text: string, priority: Priority) => void;
  theme: Theme;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  theme,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const getPriorityColor = (priority: Priority): string => {
    return theme.colors.priority[priority.toLowerCase() as keyof typeof theme.colors.priority];
  };

  const getPriorityIcon = (priority: Priority): string => {
    switch (priority) {
      case 'High':
        return 'arrow-up-bold';
      case 'Medium':
        return 'minus';
      case 'Low':
        return 'arrow-down-bold';
      default:
        return 'circle';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
    setEditPriority(task.priority);
  };

  const handleSave = () => {
    if (editText.trim() && onEdit) {
      onEdit(task.id, editText.trim(), editPriority);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setIsEditing(false);
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
    <Animated.View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            value={editText}
            onChangeText={setEditText}
            style={[styles.editInput, { color: theme.colors.text }]}
            multiline
            autoFocus
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
          
          <View style={styles.editPriorityContainer}>
            <SegmentedButtons
              value={editPriority}
              onValueChange={(value) => setEditPriority(value as Priority)}
              buttons={priorityButtons}
              style={styles.editPriorityButtons}
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
          
          <View style={styles.editActions}>
            <IconButton
              icon="check"
              size={20}
              iconColor={theme.colors.success}
              onPress={handleSave}
            />
            <IconButton
              icon="close"
              size={20}
              iconColor={theme.colors.error}
              onPress={handleCancel}
            />
          </View>
        </View>
      ) : (
        <View style={styles.taskContent}>
          <TouchableOpacity
            style={[
              styles.checkboxContainer,
              {
                borderColor: theme.colors.text,
                backgroundColor: task.completed ? theme.colors.primary : 'transparent',
              },
            ]}
            onPress={() => onToggle(task.id)}
            activeOpacity={0.7}
          >
            {task.completed && (
              <Text style={[styles.checkmark, { color: theme.colors.onPrimaryContainer }]}>
                ✓
              </Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.textContainer}
            onPress={handleEdit}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.taskText,
                { color: theme.colors.text },
                task.completed && styles.completedText,
              ]}
            >
              {task.text}
            </Text>
            
            <View style={styles.priorityContainer}>
              <IconButton
                icon={getPriorityIcon(task.priority)}
                size={12}
                iconColor={getPriorityColor(task.priority)}
                style={styles.priorityIcon}
              />
              <Text
                style={[
                  styles.priorityText,
                  { color: getPriorityColor(task.priority) },
                ]}
              >
                {task.priority}
              </Text>
            </View>
          </TouchableOpacity>
          
          <IconButton
            icon="pencil"
            size={20}
            iconColor={theme.colors.textSecondary}
            onPress={handleEdit}
          />
          <IconButton
            icon="delete"
            size={20}
            iconColor={theme.colors.error}
            onPress={() => onDelete(task.id)}
            style={styles.deleteButton}
          />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 8,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIcon: {
    margin: 0,
    padding: 0,
    width: 16,
    height: 16,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteButton: {
    margin: 0,
    padding: 0,
  },
  editContainer: {
    padding: 12,
  },
  editInput: {
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'transparent',
  },
  editPriorityContainer: {
    marginBottom: 12,
  },
  editPriorityButtons: {
    backgroundColor: 'transparent',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});

export default TaskItem;
