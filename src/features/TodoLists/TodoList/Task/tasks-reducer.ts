import {todolistAPI} from "../../../../api/todolist-api";
import {appActions} from '../../../CommonActions/App';
import {
    handleAsyncNetworkError,
    handleAsyncServerAppError,
    handleNetworkError,
    handleServerAppError
} from "../../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {asyncActions as asyncTodoListsActions} from '../../todolists-reducer'
import {RootState, ThunkErrorType} from "../../../../utils/types";
import {TaskType, UpdatedDomainTaskModel} from "../../../../api/types";
import {authActions} from "../../../Auth";

const {setAppStatus} = appActions

const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTasks(todoId)
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todoId, tasks: res.data.items}
    } catch (err) {
        handleNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todoId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.deleteTask(param.todoId, param.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoId: param.todoId, taskId: param.taskId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (err) {
        handleNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
const addTask = createAsyncThunk<TaskType, { todoId: string, title: string }, ThunkErrorType>('tasks/addTask',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistAPI.createTask(param.todoId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                return res.data.data.item
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI, false)
        }
    })
const updateTask = createAsyncThunk<{ todoId: string, taskId: string, model: UpdateModelType },
    { todoId: string, taskId: string, model: UpdateModelType },
    ThunkErrorType>('tasks/updateTask',
    async (param: { todoId: string, taskId: string, model: UpdateModelType }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        const state = thunkAPI.getState() as RootState
        const task = state.tasks[param.todoId].find(t => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue({errors: ['Task not found'], fieldsErrors: undefined})
        }
        const newTask: UpdatedDomainTaskModel = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...param.model,
        }
        try {
            const res = await todolistAPI.updateTask(param.todoId, param.taskId, newTask)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                return {todoId: param.todoId, taskId: param.taskId, model: param.model}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err: any) {
            return handleAsyncNetworkError(err, thunkAPI, false)
        }
    })

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask,
}

export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(asyncTodoListsActions.addTodoList.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(asyncTodoListsActions.removeTodoList.fulfilled, (state, action) => {
                delete state[action.payload]
            })
            .addCase(asyncTodoListsActions.fetchTodoLists.fulfilled, (state, action) => {
                action.payload.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoId]
                const index = tasks.findIndex(t => t.id === action.payload?.taskId)
                if (index > -1) tasks.splice(index, 1)
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todoId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
            })
            .addCase(authActions.logout.fulfilled, (state, action) => {
                for (let task in state) {
                    delete state[task]
                }
            })
    }
})

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}