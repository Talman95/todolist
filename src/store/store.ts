import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "../features/Application";
import {authReducer} from "../features/Auth";
import {tasksReducer, todoListsReducer} from "../features/TodoLists";
import {taskModalReducer} from "../features/TaskModal";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    modal: taskModalReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})