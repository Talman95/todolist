import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListsActionsType, todoListsReducer} from "../features/TodoList/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/TodoList/Task/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer, AppReducerActionsType} from "../app/app-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})
// export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodoListsActionsType | TasksActionsType | AppReducerActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>