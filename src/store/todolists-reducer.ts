import {Dispatch} from "redux";
import {todolistAPI, TodoListType} from "../api/todolist-api";

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListsStateType = TodoListType & {
    filterValue: FilterValuesType
}

export type RemoveTodoListType = {
    type: 'REMOVE_TODOLIST'
    todoListID: string
}
export type AddTodoListType = {
    type: 'ADD_TODOLIST'
    todoList: TodoListType
}
type ChangeTodoListTitleType = {
    type: 'TODOLIST_CHANGE_TITLE'
    todoListID: string
    title: string
}
type ChangeFilterValueType = {
    type: 'CHANGE_FILTER_VALUE'
    todoListID: string
    filterValue: FilterValuesType
}
export type SetTodoListsType = {
    type: 'SET_TODOLISTS'
    todoLists: TodoListType[]
}

const initialState: TodoListsStateType[] = []

export const todoListsReducer = (state = initialState, action: TodoListsActionType): TodoListsStateType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)
        case 'ADD_TODOLIST':
            return [{...action.todoList, filterValue: 'All'}, ...state]
        case 'TODOLIST_CHANGE_TITLE':
            return state.map(
                tl => tl.id === action.todoListID
                    ?
                    {...tl, title: action.title}
                    :
                    tl
            )
        case 'CHANGE_FILTER_VALUE':
            return state.map(
                tl => tl.id === action.todoListID
                    ?
                    {...tl, filterValue: action.filterValue}
                    :
                    tl
            )
        case 'SET_TODOLISTS': {
            return action.todoLists.map(tl => ({...tl, filterValue: 'All'}))
        }
        default:
            return state
    }
}

export type TodoListsActionType =
    RemoveTodoListType | AddTodoListType
    | ChangeTodoListTitleType | ChangeFilterValueType
    | SetTodoListsType

export const removeTodoListAC = (todoListID: string): RemoveTodoListType => (
    {type: 'REMOVE_TODOLIST', todoListID}
)
export const addTodoListAC = (todoList: TodoListType): AddTodoListType => (
    {type: 'ADD_TODOLIST', todoList}
)
export const changeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleType => (
    {type: 'TODOLIST_CHANGE_TITLE', todoListID, title}
)
export const changeFilterValueAC = (todoListID: string, filterValue: FilterValuesType): ChangeFilterValueType => (
    {type: 'CHANGE_FILTER_VALUE', todoListID, filterValue}
)
export const setTodoListsAC = (todoLists: TodoListType[]): SetTodoListsType => (
    {type: 'SET_TODOLISTS', todoLists}
)

//thunks
export const fetchTodoLists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const removeTodoListTC = (todoListID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todoListID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListID))
            }
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
            }
        })
}
export const updateTodoListTitleTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todoListID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListID, title))
            }
        })
}