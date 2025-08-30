import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTodoSelector } from '../hooks/todoHooks';

const TodoStats: React.FC = () => {
  const { stats } = useTodoSelector();

  if (stats.total === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        {stats.completed} of {stats.total} completed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
});

export default TodoStats;



