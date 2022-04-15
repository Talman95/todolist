import {v1} from "uuid";
import {TodoListType} from "../api/todolist-api";

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
    title: string
    todoListID: string
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
            const newTodoList: TodoListsStateType = {
                id: action.todoListID,
                addedDate: '',
                order: 0,
                title: action.title,
                filterValue: 'All',
            }
            return [...state, newTodoList]
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
export const addTodoListAC = (title: string): AddTodoListType => (
    {type: 'ADD_TODOLIST', title, todoListID: v1()}
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