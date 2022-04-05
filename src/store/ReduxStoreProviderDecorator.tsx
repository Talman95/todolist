import React from 'react';
import {Provider} from "react-redux"
import {AppStateType} from "./store"
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filterValue: "All"},
        {id: "todolistId2", title: "What to buy", filterValue: "All"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: '111', title: "HTML&CSS", isDone: true},
            {id: '222', title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: '11111', title: "Milk", isDone: true},
            {id: '22222', title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}