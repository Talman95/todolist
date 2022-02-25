import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";

const REMOVE_TODOLIST = "REMOVE_TODOLIST"
const ADD_TODOLIST = "ADD_TODOLIST"
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"

const todoList_1 = v1();
const todoList_2 = v1();
const todoList_3 = v1();

const initialState: TodoListType[] = [
    {id: todoList_1, title: 'What to learn', filterValue: 'All'},
    {id: todoList_2, title: 'What to buy', filterValue: 'All'},
    {id: todoList_3, title: 'What to read', filterValue: 'All'}
]

export const todoListsReducer = (state = initialState, action: todoListsActionType) => {
    switch (action.type) {
        case(REMOVE_TODOLIST):
            return state.filter(tl => tl.id !== action.id)
        case(ADD_TODOLIST):
            const newID = v1()
            const newTodoList: TodoListType = {id: newID, title: action.title, filterValue: 'All'}
            return [...state, newTodoList]
        case(CHANGE_TODOLIST_TITLE):
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        case(CHANGE_TODOLIST_FILTER):
            return state.map(tl => tl.id === action.id ? {...tl, filterValue: action.filter} : tl)
        default:
            return state
    }
}

type todoListsActionType =
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC>


export const removeTodoListAC = (id: string) => ({type: REMOVE_TODOLIST, id} as const)
export const addTodoListAC = (title: string) => ({type: ADD_TODOLIST, title} as const)
export const changeTodoListTitleAC = (id: string, newTitle: string) => (
    {type: CHANGE_TODOLIST_TITLE, id, newTitle} as const
)
export const changeTodoListFilterAC = (id: string, filter: FilterValueType) => (
    {type: CHANGE_TODOLIST_FILTER, id, filter} as const
)