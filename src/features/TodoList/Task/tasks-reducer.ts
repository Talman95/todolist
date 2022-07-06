import {TaskType, todolistAPI, UpdatedDomainTaskModel} from "../../../api/todolist-api";
import {RootState} from "../../../store/store";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../todolists-reducer";
import {setAppStatus} from "../../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todoId] = action.payload.tasks
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(t => t.id === action.payload?.taskId)
            if (index > -1) tasks.splice(index, 1)
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
        })
    }
})

export const tasksReducer = slice.reducer

// thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoId: string, thunkAPI) => {
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
export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todoId: string, taskId: string }, thunkAPI) => {
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
export const addTask = createAsyncThunk('tasks/addTask', async (param: { todoId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTask(param.todoId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (err) {
        handleNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { todoId: string, taskId: string, model: UpdateModelType }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const state = thunkAPI.getState() as RootState
    const task = state.tasks[param.todoId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue({})
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
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (err) {
        handleNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
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