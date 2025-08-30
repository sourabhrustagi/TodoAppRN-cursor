import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    // Add other feature reducers here as the app grows
    // auth: authReducer,
    // settings: settingsReducer,
    // notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
