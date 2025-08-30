import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const selectAllTodos = (state: RootState) => state.todos.todos;

export const selectTodoStats = createSelector(
  [selectAllTodos],
  (todos) => ({
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  })
);