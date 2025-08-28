/**
 * Todo App
 * A simple React Native todo application with Redux
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { logger } from './src/utils/logger';
import AddTodo from './src/components/AddTodo';
import TodoList from './src/components/TodoList';
import TodoStats from './src/components/TodoStats';

function AppContent() {
  logger.info('App: Starting TodoRN application with Redux');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      <View style={styles.header}>
        <Text style={styles.title}>Todo App</Text>
        <TodoStats />
      </View>
      <AddTodo />
      <TodoList />
    </SafeAreaView>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
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
});

export default App;
