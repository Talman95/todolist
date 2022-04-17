import {AddTodoListType, RemoveTodoListType, SetTodoListsType} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppStateType} from "./store";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type RemoveTaskType = {
    type: 'REMOVE_TASK'
    todoListID: string
    taskID: string
}
type AddTaskType = {
    type: 'ADD_TASK'
    todoListID: string
    newTask: TaskType
}
type ChangeStatusType = {
    type: 'CHANGE_STATUS'
    todoListID: string
    taskID: string
    status: TaskStatuses
}
type ChangeTitleType = {
    type: 'CHANGE_TASK_TITLE'
    todoListID: string
    taskID: string
    title: string
}
type SetTasksType = {
    type: 'SET_TASKS'
    todoListID: string
    tasks: TaskType[]
}

export type TasksActionsType =
    RemoveTaskType | AddTaskType
    | ChangeStatusType | ChangeTitleType
    | AddTodoListType | RemoveTodoListType
    | SetTodoListsType | SetTasksType

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
            // const newTaskID = v1()
            // const newTask: TaskType = {
            //     id: newTaskID,
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     addedDate: '',
            //     deadline: '',
            //     description: '',
            //     order: 0,
            //     priority: TaskPriorities.Low,
            //     startDate: '',
            //     todoListId: action.todoListID,
            // }
            return {
                ...state,
                [action.todoListID]: [action.newTask, ...state[action.todoListID]]
            }
        }
        case 'CHANGE_STATUS': {
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

export const removeTaskAC = (todoListID: string, taskID: string): RemoveTaskType => (
    {type: 'REMOVE_TASK', todoListID, taskID}
)
export const addTaskAC = (todoListID: string, newTask: TaskType): AddTaskType => (
    {type: 'ADD_TASK', todoListID, newTask}
)
export const changeStatusAC = (todoListID: string, taskID: string, status: TaskStatuses): ChangeStatusType => (
    {type: 'CHANGE_STATUS', todoListID, taskID, status}
)
export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string): ChangeTitleType => (
    {type: 'CHANGE_TASK_TITLE', todoListID, taskID, title}
)
export const setTasksAC = (todoListID: string, tasks: TaskType[]): SetTasksType => (
    {type: 'SET_TASKS', todoListID, tasks}
)

// thunks
export const fetchTasksTC = (todoListID: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoListID)
        .then(res => {
            dispatch(setTasksAC(todoListID, res.data.items))
        })
}
export const removeTaskTC = (todoListID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todoListID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todoListID, taskID))
            }
        })
}
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todoListID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todoListID, res.data.data.item))
            }
        })
}
export const updateTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
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
                        dispatch(changeStatusAC(todoListID, taskID, status))
                    }
                })
        }
    }
}
export const updateTaskTitleTC = (todoListID: string, taskID: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
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
                }
            })
        }
    }
}