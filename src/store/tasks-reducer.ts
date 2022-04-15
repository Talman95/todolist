import {v1} from "uuid";
import {AddTodoListType, RemoveTodoListType, SetTodoListsType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

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
    title: string
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

export type TasksActionsType =
    RemoveTaskType | AddTaskType
    | ChangeStatusType | ChangeTitleType
    | AddTodoListType | RemoveTodoListType
    | SetTodoListsType

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
            const newTaskID = v1()
            const newTask: TaskType = {
                id: newTaskID,
                title: action.title,
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: action.todoListID,
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
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
            return {...state, [action.todoListID]: []}
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
        default:
            return state
    }
}

export const removeTaskAC = (todoListID: string, taskID: string): RemoveTaskType => (
    {type: 'REMOVE_TASK', todoListID, taskID}
)
export const addTaskAC = (todoListID: string, title: string): AddTaskType => (
    {type: 'ADD_TASK', todoListID, title}
)
export const changeStatusAC = (todoListID: string, taskID: string, status: TaskStatuses): ChangeStatusType => (
    {type: 'CHANGE_STATUS', todoListID, taskID, status}
)
export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string): ChangeTitleType => (
    {type: 'CHANGE_TASK_TITLE', todoListID, taskID, title}
)