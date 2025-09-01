import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types/todo';

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, clearTodos } = todoSlice.actions;

export default todoSlice.reducer;



