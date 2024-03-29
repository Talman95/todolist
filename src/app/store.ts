import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { appReducer } from './app.reducer';

import { authReducer } from 'features/auth/auth.reducer';
import { taskModalReducer } from 'features/taskModal/taskModal.reducer';
import { tasksReducer } from 'features/todoListsContainer/tasks.reducer';
import { todoListsReducer } from 'features/todoListsContainer/todoLists.reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todoLists: todoListsReducer,
  tasks: tasksReducer,
  modal: taskModalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootReducerType = typeof rootReducer;
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
