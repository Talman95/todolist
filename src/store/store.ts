import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../features/Application";
import {authReducer} from "../features/Auth";
import {tasksReducer, todoListsReducer} from "../features/TodoLists";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})