import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { selectTodoStats } from '../store/selectors/todoSelectors';

const TodoStats: React.FC = () => {
  const stats = useAppSelector(selectTodoStats);

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



