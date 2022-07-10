import React, {ReactNode} from 'react';
import {Provider} from "react-redux"
import {RootReducerType, RootState} from "../../store/store"
import {combineReducers} from 'redux';
import {tasksReducer} from '../../features/TodoListsContainer/TodoList/Task/tasks-reducer';
import {todoListsReducer} from "../../features/TodoListsContainer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/app-reducer";
import {authReducer} from "../../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer: RootReducerType = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", addedDate: '', order: 0, title: "What to learn", filterValue: "All", entityStatus: 'idle'},
        {id: "todolistId2", addedDate: '', order: 0, title: "What to buy", filterValue: "All", entityStatus: 'loading'},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: '111', title: "HTML&CSS", addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '',
                status: TaskStatuses.New, todoListId: 'todolistId1',
            },
            {
                id: '222', title: "JS", addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '',
                status: TaskStatuses.Completed, todoListId: 'todolistId1',
            }
        ],
        ["todolistId2"]: [
            {
                id: '11111', title: "Milk", addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '',
                status: TaskStatuses.New, todoListId: 'todolistId2',
            },
            {
                id: '22222', title: "React Book", addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '',
                status: TaskStatuses.Completed, todoListId: 'todolistId2',
            }
        ]
    },
    app: {
        status: 'idle',
        errorMessage: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState as RootState,
})

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
    // @ts-ignore
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const BrowserRouterDecorator = (storyFn: () => ReactNode) => {
    return <HashRouter>{storyFn()}</HashRouter>
}