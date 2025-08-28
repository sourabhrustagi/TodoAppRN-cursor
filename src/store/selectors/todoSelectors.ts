import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectAllTodos = (state: RootState) => state.todos.todos;
export const selectTodoLoading = (state: RootState) => state.todos.loading;
export const selectTodoError = (state: RootState) => state.todos.error;

export const selectCompletedTodos = createSelector([selectAllTodos], todos =>
  todos.filter(t => t.completed)
);

export const selectTodoStats = createSelector(
  [selectAllTodos, selectCompletedTodos],
  (all, completed) => ({
    total: all.length,
    completed: completed.length,
    active: all.length - completed.length,
  })
);