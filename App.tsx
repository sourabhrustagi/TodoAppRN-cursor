/**
 * Todo App
 * A simple React Native todo application
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { logger } from './src/utils/logger';
import AddTodo from './src/components/AddTodo';
import TodoList from './src/components/TodoList';
import { Todo } from './src/types/todo';

function App() {
  logger.info('App: Starting TodoRN application');
  
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    logger.info(`App: Added new todo: ${text}`);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    logger.info(`App: Toggled todo with id: ${id}`);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    logger.info(`App: Deleted todo with id: ${id}`);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Todo App</Text>
        {totalCount > 0 && (
          <Text style={styles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        )}
      </View>

      {/* Add Todo Component */}
      <AddTodo onAdd={addTodo} />
 
      {/* Todo List */}
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
});

export default App;
