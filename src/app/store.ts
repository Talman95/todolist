import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app.reducer";
import {authReducer} from "../features/auth/auth.reducer";
import {tasksReducer} from "../features/todoListsContainer/tasks.reducer";
import {todoListsReducer} from "../features/todoListsContainer/todoLists.reducer";
import {taskModalReducer} from "../features/taskModal/taskModal.reducer";

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
