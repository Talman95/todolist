import React, { ReactNode } from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { combineReducers } from 'redux';

import { TaskPriorities, TaskStatuses } from 'api/types';
import { appReducer } from 'app/app.reducer';
import { RootReducerType, RootState } from 'app/store';
import { authReducer } from 'features/auth/auth.reducer';
import { taskModalReducer } from 'features/taskModal/taskModal.reducer';
import { tasksReducer } from 'features/todoListsContainer/tasks.reducer';
import { todoListsReducer } from 'features/todoListsContainer/todoLists.reducer';

const rootReducer: RootReducerType = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
  modal: taskModalReducer,
});

const initialGlobalState = {
  todoLists: [
    {
      id: 'todolistId1',
      addedDate: '',
      order: 0,
      title: 'What to learn',
      filterValue: 'All',
      entityStatus: 'idle',
    },
    {
      id: 'todolistId2',
      addedDate: '',
      order: 0,
      title: 'What to buy',
      filterValue: 'All',
      entityStatus: 'loading',
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: '111',
        title: 'HTML&CSS',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
      },
      {
        id: '222',
        title: 'JS',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
      },
    ],
    todolistId2: [
      {
        id: '11111',
        title: 'Milk',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
      },
      {
        id: '22222',
        title: 'React Book',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
      },
    ],
  },
  app: {
    status: 'idle',
    errorMessage: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
  modal: {
    currentTask: null,
  },
};

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState as RootState,
});

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};

export const BrowserRouterDecorator = (storyFn: () => ReactNode) => {
  return <HashRouter>{storyFn()}</HashRouter>;
};
