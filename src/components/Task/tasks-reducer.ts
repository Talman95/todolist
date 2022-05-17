import {TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {AppStateType, AppThunk} from "../../store/store";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../TodoList/todolists-reducer";
import {setAppErrorMessage, setAppStatus} from "../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(
                    t => t.id !== action.taskID
                )
            }
        }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.todoListID]: [action.newTask, ...state[action.todoListID]]
            }
        }
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(
                    t => t.id === action.taskID
                        ?
                        {...t, status: action.status}
                        :
                        t
                )
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(
                    t => t.id === action.taskID
                        ?
                        {...t, title: action.title}
                        :
                        t
                )
            }
        }
        case 'ADD_TODOLIST': {
            return {...state, [action.todoList.id]: []}
        }
        case 'REMOVE_TODOLIST': {
            // const {[action.todoListID]: [], ...rest} = {...state}
            // return rest
            const copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        case 'SET_TODOLISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => (copyState[tl.id] = []))
            return copyState
        }
        case 'SET_TASKS': {
            return {
                ...state,
                [action.todoListID]: action.tasks
            }
        }
        default:
            return state
    }
}

//actions
export const removeTaskAC = (todoListID: string, taskID: string) => (
    {type: 'REMOVE_TASK', todoListID, taskID} as const
)
export const addTaskAC = (todoListID: string, newTask: TaskType) => (
    {type: 'ADD_TASK', todoListID, newTask} as const
)
export const changeTaskStatusAC = (todoListID: string, taskID: string, status: TaskStatuses) => (
    {type: 'CHANGE_TASK_STATUS', todoListID, taskID, status} as const
)
export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string) => (
    {type: 'CHANGE_TASK_TITLE', todoListID, taskID, title} as const
)
export const setTasksAC = (todoListID: string, tasks: TaskType[]) => (
    {type: 'SET_TASKS', todoListID, tasks} as const
)

// thunks
export const fetchTasksTC = (todoListID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistAPI.getTasks(todoListID)
            .then(res => {
                dispatch(setTasksAC(todoListID, res.data.items))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(err => {
                handleNetworkError(err, dispatch)
            })
    }
}
export const removeTaskTC = (todoListID: string, taskID: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistAPI.deleteTask(todoListID, taskID)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todoListID, taskID))
                    dispatch(setAppStatus('succeeded'))
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
        dispatch(setAppStatus('loading'))
        todolistAPI.createTask(todoListID, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(todoListID, res.data.data.item))
                    dispatch(setAppStatus('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleNetworkError(err, dispatch)
            })

    }
}
export const updateTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatuses): AppThunk => {
    return (dispatch, getState: () => AppStateType) => {
        dispatch(setAppStatus('loading'))
        const task = getState().tasks[todoListID].find(t => t.id === taskID)
        if (task) {
            todolistAPI.updateTask(todoListID, taskID, {
                title: task.title,
                description: task.description,
                status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            })
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskStatusAC(todoListID, taskID, status))
                        dispatch(setAppStatus('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(err => {
                    handleNetworkError(err, dispatch)
                })
        }
    }
}
export const updateTaskTitleTC = (todoListID: string, taskID: string, title: string): AppThunk => {
    return (dispatch, getState: () => AppStateType) => {
        dispatch(setAppStatus('loading'))
        const task = getState().tasks[todoListID].find(t => t.id === taskID)
        if (task) {
            todolistAPI.updateTask(todoListID, taskID, {
                title: title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            }).then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(todoListID, taskID, title))
                    dispatch(setAppStatus('succeeded'))
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

export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>