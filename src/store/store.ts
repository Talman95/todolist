import {combineReducers} from "redux";
import {TodoListsActionsType, todoListsReducer} from "../features/TodoListsContainer/todolists-reducer";
import {tasksReducer} from "../features/TodoListsContainer/TodoList/Task/tasks-reducer";
import {ThunkAction} from "redux-thunk";
import {appReducer, AppReducerActionsType} from "../app/app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppActionsType = TodoListsActionsType | AppReducerActionsType
export type RootReducerType = typeof rootReducer

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>