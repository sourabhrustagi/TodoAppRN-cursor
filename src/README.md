# Feature-Based Architecture

This project follows a **Feature-Based (Modular) Architecture** pattern, organizing code by business features rather than technical concerns. This approach improves scalability, maintainability, and team collaboration.

## 📁 Directory Structure

```
src/
├── app/                    # App-level configuration
│   ├── components/         # App-specific components
│   ├── store/             # Root store configuration
│   └── types/             # App-level types
├── features/              # Feature modules
│   └── todo/              # Todo feature
│       ├── components/    # Feature-specific components
│       ├── hooks/         # Feature-specific hooks
│       ├── services/      # Business logic and API calls
│       ├── types/         # Feature-specific types
│       ├── utils/         # Feature-specific utilities
│       ├── todoSlice.ts   # Redux slice
│       ├── todoSelectors.ts # Redux selectors
│       └── index.ts       # Feature public API
└── shared/                # Shared resources
    ├── components/        # Reusable components
    ├── hooks/            # Shared hooks
    ├── types/            # Shared types
    ├── utils/            # Shared utilities
    └── constants/        # App constants
```

## 🏗️ Architecture Principles

### 1. **Feature Encapsulation**
Each feature is self-contained with its own:
- Components
- Business logic
- State management
- Types
- Utilities

### 2. **Clear Boundaries**
- Features communicate through well-defined APIs
- Shared resources are clearly separated
- Dependencies flow in one direction

### 3. **Scalability**
- Easy to add new features
- Features can be developed independently
- Clear separation of concerns

## 🎯 Feature Structure

### Todo Feature (`src/features/todo/`)

```
todo/
├── components/           # UI components
│   ├── AddTodo.tsx
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   └── TodoStats.tsx
├── hooks/               # Custom hooks
│   └── todoHooks.ts
├── services/            # Business logic
│   └── todoService.ts
├── types/               # Type definitions
│   └── todo.ts
├── utils/               # Utility functions
│   └── todoUtils.ts
├── todoSlice.ts         # Redux slice
├── todoSelectors.ts     # Redux selectors
└── index.ts             # Public API
```

### Public API (`index.ts`)
Each feature exposes only what other features need:

```typescript
// Only export what other features should use
export { AddTodo, TodoList, TodoItem, TodoStats } from './components';
export { useTodoDispatch, useTodoSelector } from './hooks/todoHooks';
export type { Todo } from './types/todo';
export { selectAllTodos, selectTodoStats } from './todoSelectors';
```

## 🔄 Data Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Components  │───▶│    Hooks    │───▶│   Redux     │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Utils     │    │  Services   │    │  Selectors  │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 🛠️ Shared Resources

### Components (`src/shared/components/`)
Reusable UI components used across features:
- `Button` - Configurable button component
- `Input` - Form input with validation

### Hooks (`src/shared/hooks/`)
Shared React hooks:
- `useAppDispatch` - Typed Redux dispatch
- `useAppSelector` - Typed Redux selector

### Types (`src/shared/types/`)
Common type definitions:
- `BaseEntity` - Base interface for entities
- `ApiResponse` - Standard API response format
- `LoadingState` - Loading and error states

### Utils (`src/shared/utils/`)
Shared utility functions:
- `logger` - Centralized logging

### Constants (`src/shared/constants/`)
App-wide constants:
- API endpoints
- Validation rules
- Error messages
- Feature flags

## 📝 Best Practices

### 1. **Feature Independence**
- Features should not directly import from other features
- Use shared resources for common functionality
- Communicate through well-defined APIs

### 2. **Import Organization**
```typescript
// ✅ Good - Clear import hierarchy
import { Button } from '../../../shared/components';
import { useTodoSelector } from '../hooks/todoHooks';
import { validateTodoText } from '../utils/todoUtils';

// ❌ Bad - Direct feature imports
import { SomeComponent } from '../../other-feature/components';
```

### 3. **Type Safety**
- Use TypeScript interfaces for all data structures
- Export types from feature index files
- Use shared types for common patterns

### 4. **State Management**
- Keep Redux slices within features
- Use selectors for data access
- Implement custom hooks for complex logic

### 5. **Testing**
- Test features in isolation
- Mock shared dependencies
- Use feature-specific test utilities

## 🚀 Adding New Features

1. **Create Feature Directory**
   ```bash
   mkdir -p src/features/new-feature/{components,hooks,services,types,utils}
   ```

2. **Create Feature Structure**
   - Add components in `components/`
   - Add business logic in `services/`
   - Add custom hooks in `hooks/`
   - Add types in `types/`
   - Add utilities in `utils/`

3. **Create Public API**
   ```typescript
   // src/features/new-feature/index.ts
   export { Component1, Component2 } from './components';
   export { useNewFeature } from './hooks/newFeatureHooks';
   export type { NewFeatureType } from './types/newFeature';
   ```

4. **Add to App Store**
   ```typescript
   // src/app/store/index.ts
   import newFeatureReducer from '../../features/new-feature/newFeatureSlice';
   
   export const store = configureStore({
     reducer: {
       // ... existing reducers
       newFeature: newFeatureReducer,
     },
   });
   ```

## 🔧 Development Workflow

### 1. **Feature Development**
- Work within feature boundaries
- Use shared resources when possible
- Keep feature-specific code isolated

### 2. **Code Review**
- Check feature encapsulation
- Verify import organization
- Ensure proper API exposure

### 3. **Testing**
- Test features independently
- Mock external dependencies
- Use feature-specific test utilities

## 📚 Additional Resources

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/usage/usage-guide)
- [React Native Architecture](https://reactnative.dev/docs/architecture-overview)
