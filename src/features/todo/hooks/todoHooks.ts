import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import {
  selectAllTodos,
  selectTodoStats,
} from '../todoSelectors';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearTodos,
} from '../todoSlice';
import type { Todo } from '../types/todo';

// Custom hook for todo selectors
export const useTodoSelector = () => {
  return {
    todos: useAppSelector(selectAllTodos),
    stats: useAppSelector(selectTodoStats),
  };
};

// Hook for individual todo operations
export const useTodo = (id: string) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectAllTodos);
  
  const todo = todos.find(t => t.id === id);
  
  return {
    todo,
    toggle: () => dispatch(toggleTodo(id)),
    delete: () => dispatch(deleteTodo(id)),
  };
};

// Hook for todo creation
export const useCreateTodo = () => {
  const dispatch = useAppDispatch();
  
  return {
    createTodo: (text: string) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      dispatch(addTodo(newTodo));
      return newTodo;
    },
  };
};

// Hook for bulk todo operations
export const useTodoBulkActions = () => {
  const dispatch = useAppDispatch();
  
  return {
    clearAllTodos: () => dispatch(clearTodos()),
  };
};
