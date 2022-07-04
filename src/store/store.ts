import {combineReducers} from "redux";
import {TodoListsActionsType, todoListsReducer} from "../features/TodoList/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/TodoList/Task/tasks-reducer";
import {ThunkAction} from "redux-thunk";
import {appReducer, AppReducerActionsType} from "../app/app-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppActionsType = TodoListsActionsType | TasksActionsType | AppReducerActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>