import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { useCreateTodo } from '../hooks/todoHooks';
import { validateTodoText } from '../utils/todoUtils';
import { ERROR_MESSAGES } from '../../../shared/constants';

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { createTodo } = useCreateTodo();

  const handleAdd = () => {
    const validation = validateTodoText(text);
    
    if (!validation.isValid) {
      setError(validation.error || ERROR_MESSAGES.VALIDATION_ERROR);
      return;
    }
    
    try {
      createTodo(text);
      setText('');
      setError(null);
    } catch (err) {
      setError(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={text}
        onChangeText={(newText) => {
          setText(newText);
          if (error) setError(null);
        }}
        placeholder="Add a new todo..."
        placeholderTextColor="#999999"
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
        onPress={handleAdd}
        disabled={!text.trim()}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F8F8F8',
  },
  addButton: {
    marginLeft: 12,
    height: 48,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 8,
    marginLeft: 16,
  },
});

export default AddTodo;
