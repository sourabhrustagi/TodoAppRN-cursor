// Validation constants
export const VALIDATION = {
  MIN_TODO_LENGTH: 1,
  MAX_TODO_LENGTH: 500,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;
