import {v1} from "uuid";
import {AddTodoListType, RemoveTodoListType} from "./todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

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
    status: boolean
}
type ChangeTitleType = {
    type: 'CHANGE_TASK_TITLE'
    todoListID: string
    taskID: string
    title: string
}

export type ActionsType =
    RemoveTaskType | AddTaskType
    | ChangeStatusType | ChangeTitleType
    | AddTodoListType | RemoveTodoListType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(
                    t => t.id !== action.taskID
                )
            }
        case 'ADD_TASK':
            const newTaskID = v1()
            const newTask: TaskType = {
                id: newTaskID,
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case 'CHANGE_STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(
                    t => t.id === action.taskID
                        ?
                        {...t, isDone: action.status}
                        :
                        t
                )
            }
        case 'CHANGE_TASK_TITLE':
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
        case 'ADD_TODOLIST':
            return {...state, [action.todoListID]: []}
        case 'REMOVE_TODOLIST':
            const {[action.todoListID]: [], ...rest} = {...state}
            return rest
        // const copyState = {...state}
        // delete copyState[action.todoListID]
        // return copyState
        default:
            return state
    }
}

export const RemoveTaskAC = (todoListID: string, taskID: string): RemoveTaskType => (
    {type: 'REMOVE_TASK', todoListID, taskID}
)
export const AddTaskAC = (todoListID: string, title: string): AddTaskType => (
    {type: 'ADD_TASK', todoListID, title}
)
export const ChangeStatusAC = (todoListID: string, taskID: string, status: boolean): ChangeStatusType => (
    {type: 'CHANGE_STATUS', todoListID, taskID, status}
)
export const ChangeTaskTitleAC = (todoListID: string, taskID: string, title: string): ChangeTitleType => (
    {type: 'CHANGE_TASK_TITLE', todoListID, taskID, title}
)