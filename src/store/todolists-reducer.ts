import {todolistAPI, TodoListType} from "../api/todolist-api";
import {AppThunk} from "./store";


const initialState: TodoListsStateType[] = []

export const todoListsReducer = (state = initialState, action: TodoListsActionsType): TodoListsStateType[] => {
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

//actions

export const removeTodoListAC = (todoListID: string) => (
    {type: 'REMOVE_TODOLIST', todoListID} as const
)
export const addTodoListAC = (todoList: TodoListType) => (
    {type: 'ADD_TODOLIST', todoList} as const
)
export const changeTodoListTitleAC = (todoListID: string, title: string) => (
    {type: 'TODOLIST_CHANGE_TITLE', todoListID, title} as const
)
export const changeFilterValueAC = (todoListID: string, filterValue: FilterValuesType) => (
    {type: 'CHANGE_FILTER_VALUE', todoListID, filterValue} as const
)
export const setTodoListsAC = (todoLists: TodoListType[]) => (
    {type: 'SET_TODOLISTS', todoLists} as const
)

//thunks
export const fetchTodoLists = (): AppThunk => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}
export const removeTodoListTC = (todoListID: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.deleteTodolist(todoListID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoListAC(todoListID))
                }
            })
    }
}
export const addTodoListTC = (title: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodoListAC(res.data.data.item))
                }
            })
    }
}
export const updateTodoListTitleTC = (todoListID: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistAPI.updateTodolist(todoListID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodoListTitleAC(todoListID, title))
                }
            })
    }
}

//types

export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListsStateType = TodoListType & {
    filterValue: FilterValuesType
}

export type TodoListsActionsType =
    ReturnType<typeof removeTodoListAC> | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeFilterValueAC>
    | ReturnType<typeof setTodoListsAC>