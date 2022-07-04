import {TaskType, todolistAPI, UpdatedDomainTaskModel} from "../../../api/todolist-api";
import {AppThunk, RootState} from "../../../store/store";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../todolists-reducer";
import {setAppStatus} from "../../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ todoListID: string, taskID: string }>) => {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) tasks.splice(index, 1)
        },
        addTaskAC: (state, action: PayloadAction<{ newTask: TaskType }>) => {
            state[action.payload.newTask.todoListId].unshift(action.payload.newTask)
        },
        updateTaskAC: (state, action: PayloadAction<{ todoListID: string, taskID: string, model: UpdateModelType }>) => {
            const tasks = state[action.payload.todoListID]
            const index = tasks.findIndex(t => t.id === action.payload.taskID)
            if (index > -1) tasks[index] = {...tasks[index], ...action.payload.model}
        },
        setTasksAC: (state, action: PayloadAction<{ todoListID: string, tasks: TaskType[] }>) => {
            state[action.payload.todoListID] = action.payload.tasks
        },
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
    }
})

export const tasksReducer = slice.reducer

export const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTasksAC
} = slice.actions

// thunks
export const fetchTasksTC = (todoListID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.getTasks(todoListID)
            .then(res => {
                dispatch(setTasksAC({todoListID: todoListID, tasks: res.data.items}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
            .catch(err => {
                handleNetworkError(err, dispatch)
            })
    }
}
export const removeTaskTC = (todoListID: string, taskID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.deleteTask(todoListID, taskID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({todoListID, taskID}))
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
export const addTaskTC = (todoListID: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}))
        todolistAPI.createTask(todoListID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({newTask: res.data.data.item}))
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
export const updateTaskTC = (todoListID: string, taskID: string, model: UpdateModelType): AppThunk => {
    return (dispatch, getState: () => RootState) => {
        dispatch(setAppStatus({status: 'loading'}))
        const task = getState().tasks[todoListID].find(t => t.id === taskID)
        if (task) {
            const newTask: UpdatedDomainTaskModel = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model,
            }
            todolistAPI.updateTask(todoListID, taskID, newTask).then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todoListID, taskID, model}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(err => {
                handleNetworkError(err, dispatch)
            })
        }
    }
}

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

export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>