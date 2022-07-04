import {todolistAPI, TodoListType} from "../../api/todolist-api";
import {AppThunk} from "../../store/store";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodoListsStateType[] = []

export const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        removeTodoListAC: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        addTodoListAC: (state, action: PayloadAction<{ todoList: TodoListType }>) => {
            state.unshift({...action.payload.todoList, filterValue: 'All', entityStatus: 'idle'})
        },
        changeTodoListTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].title = action.payload.title
        },
        changeFilterValueAC: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].filterValue = action.payload.filter
        },
        changeEntityStatus: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].entityStatus = action.payload.status
        },
        setTodoListsAC: (state, action: PayloadAction<{ todoLists: TodoListType[] }>) => {
            return action.payload.todoLists.map(tl => ({...tl, filterValue: 'All', entityStatus: 'idle'}))
        },
    }
})

export const todoListsReducer = slice.reducer
export const {
    removeTodoListAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeFilterValueAC,
    changeEntityStatus,
    setTodoListsAC
} = slice.actions

//thunks
export const fetchTodoLists = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodoListsAC({todoLists: res.data}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
            .catch(err => {
                handleNetworkError(err, dispatch)
                dispatch(setAppStatus({status: 'failed'}))
            })
    }
}
export const removeTodoListTC = (todoListID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeEntityStatus({id: todoListID, status: 'loading'}))
        todolistAPI.deleteTodolist(todoListID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoListAC({id: todoListID}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeEntityStatus({id: todoListID, status: 'failed'}))
                }
            })
            .catch(err => {
                handleNetworkError(err, dispatch)
                dispatch(changeEntityStatus({id: todoListID, status: 'failed'}))
            })
    }
}
export const addTodoListTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodoListAC({todoList: res.data.data.item}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleNetworkError(err, dispatch)
            })
    }
}
export const updateTodoListTitleTC = (todoListID: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(changeEntityStatus({id: todoListID, status: 'loading'}))
        todolistAPI.updateTodolist(todoListID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodoListTitleAC({id: todoListID, title}))
                    dispatch(changeEntityStatus({id: todoListID, status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeEntityStatus({id: todoListID, status: 'failed'}))
                }
            })
            .catch(err => {
                handleNetworkError(err, dispatch)
                dispatch(changeEntityStatus({id: todoListID, status: 'failed'}))
            })
    }
}

//types
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListsStateType = TodoListType & {
    filterValue: FilterValuesType
    entityStatus: RequestStatusType
}
export type TodoListsActionsType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeFilterValueAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof changeEntityStatus>