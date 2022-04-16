import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>