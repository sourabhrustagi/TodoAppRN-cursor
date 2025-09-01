import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTodo } from '../hooks/todoHooks';
import { logger } from '../../../shared/utils/logger';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onDeletePress: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onDeletePress,
}) => {
  const { toggle } = useTodo(id);
  
  const handleDeletePress = () => {
    logger.info(`[TodoItem] Delete button pressed for todo: "${text}" (ID: ${id})`);
    logger.info(`[TodoItem] Todo completion status before deletion: ${completed ? 'completed' : 'pending'}`);
    onDeletePress(id, text);
    logger.info(`[TodoItem] Delete operation initiated for todo: "${text}"`);
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.todoContainer}
        onPress={toggle}
      >
        <View style={[styles.checkbox, completed && styles.checked]}>
          {completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.todoText, completed && styles.completedText]}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeletePress}
      >
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  todoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TodoItem;