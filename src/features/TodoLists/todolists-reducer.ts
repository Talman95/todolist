import {todolistAPI, TodoListType} from "../../api/todolist-api";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodoListsStateType>,
    reducers: {
        changeFilterValue: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].filterValue = action.payload.filter
        },
        changeEntityStatus: (state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.map(tl => ({...tl, filterValue: 'All', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload)
            if (index > -1) state.splice(index, 1)
        })
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            state.unshift({...action.payload, filterValue: 'All', entityStatus: 'idle'})
        })
        builder.addCase(updateTodoListTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            if (index > -1) state[index].title = action.payload.title
        })
    }
})

export const todoListsReducer = slice.reducer
export const {
    changeFilterValue,
    changeEntityStatus,
} = slice.actions

//thunks
export const fetchTodoLists = createAsyncThunk('todoLists/fetchTodoLists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(setAppStatus({status: 'succeeded'}))
        return res.data
    } catch (err) {
        handleNetworkError(err, dispatch)
        return rejectWithValue({})
    }
})
export const removeTodoList = createAsyncThunk('todoLists/removeTodoList', async (todoId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeEntityStatus({id: todoId, status: 'loading'}))
    try {
        const res = await todolistAPI.deleteTodolist(todoId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return todoId
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(changeEntityStatus({id: todoId, status: 'failed'}))
            return rejectWithValue({})
        }
    } catch (err) {
        handleNetworkError(err, dispatch)
        dispatch(changeEntityStatus({id: todoId, status: 'failed'}))
        return rejectWithValue({})
    }
})
export const addTodoList = createAsyncThunk('todoLists/addTodoList', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (err) {
        handleNetworkError(err, dispatch)
        return rejectWithValue({})
    }
})
export const updateTodoListTitle = createAsyncThunk('todoList/updateTodoListTitle', async (param: { todoId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(changeEntityStatus({id: param.todoId, status: 'loading'}))
    try {
        const res = await todolistAPI.updateTodolist(param.todoId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(changeEntityStatus({id: param.todoId, status: 'succeeded'}))
            return {todoId: param.todoId, title: param.title}
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(changeEntityStatus({id: param.todoId, status: 'failed'}))
            return rejectWithValue({})
        }
    } catch (err) {
        handleNetworkError(err, dispatch)
        dispatch(changeEntityStatus({id: param.todoId, status: 'failed'}))
        return rejectWithValue({})
    }
})

export const asyncActions = {
    fetchTodoLists,
    removeTodoList,
    addTodoList,
    updateTodoListTitle
}

//types
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListsStateType = TodoListType & {
    filterValue: FilterValuesType
    entityStatus: RequestStatusType
}
export type TodoListsActionsType =
    | ReturnType<typeof changeFilterValue>
    | ReturnType<typeof changeEntityStatus>