import type { Todo } from '../types/todo';
import { VALIDATION } from '../../../shared/constants';

/**
 * Validates todo text
 */
export const validateTodoText = (text: string): { isValid: boolean; error?: string } => {
  const trimmedText = text.trim();
  
  if (trimmedText.length === 0) {
    return { isValid: false, error: 'Todo text cannot be empty' };
  }
  
  if (trimmedText.length < VALIDATION.MIN_TODO_LENGTH) {
    return { 
      isValid: false, 
      error: `Todo text must be at least ${VALIDATION.MIN_TODO_LENGTH} character long` 
    };
  }
  
  if (trimmedText.length > VALIDATION.MAX_TODO_LENGTH) {
    return { 
      isValid: false, 
      error: `Todo text cannot exceed ${VALIDATION.MAX_TODO_LENGTH} characters` 
    };
  }
  
  return { isValid: true };
};
