import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TodoItem from './TodoItem';
import { useTodoSelector, useTodoBulkActions } from '../hooks/todoHooks';
import { useAppDispatch } from '../../../shared/hooks';
import { deleteTodo } from '../todoSlice';
import { useDialogManager } from '../../../shared/hooks';
import { logger } from '../../../shared/utils/logger';

const TodoList: React.FC = () => {
  const { todos, stats } = useTodoSelector();
  const { clearAllTodos } = useTodoBulkActions();
  const dispatch = useAppDispatch();
  const { showDeleteTodoDialog, showClearAllTodosDialog } = useDialogManager();

  const handleClearAllPress = () => {
    logger.info(`[TodoList] Clear all button pressed. Total todos: ${todos.length}`);
    showClearAllTodosDialog(
      todos.length,
      () => {
        logger.info(`[TodoList] Confirming clear all operation for ${todos.length} todos`);
        clearAllTodos();
        logger.info('[TodoList] All todos cleared successfully');
      },
      () => {
        logger.info('[TodoList] Clear all operation cancelled by user');
      }
    );
  };

  const handleDeletePress = (id: string, text: string) => {
    logger.info(`[TodoList] Delete request received for todo: "${text}" (ID: ${id})`);
    showDeleteTodoDialog(
      text,
      () => {
        logger.info(`[TodoList] Confirming delete operation for todo: "${text}"`);
        dispatch(deleteTodo(id));
        logger.info(`[TodoList] Todo deleted successfully: "${text}"`);
      },
      () => {
        logger.info(`[TodoList] Delete operation cancelled by user for todo: "${text}"`);
      }
    );
  };

  if (todos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No todos yet</Text>
        <Text style={styles.emptySubtext}>Add a todo to get started</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {stats.total} {stats.total === 1 ? 'todo' : 'todos'}
        </Text>
        {todos.length > 1 && (
          <TouchableOpacity
            style={styles.clearAllButton}
            onPress={handleClearAllPress}
          >
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            text={item.text}
            completed={item.completed}
            onDeletePress={handleDeletePress}
          />
        )}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  clearAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default TodoList;