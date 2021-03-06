import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'bbb527b3-6bec-4c67-abf9-15d3ea5311d5'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('todo-lists', {title})
    },
    deleteTodolist(todoListID: string) {
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todoListID}`)
    },
    updateTodolist(todoListID: string, title: string) {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todoListID}`, {title})
    },
    getTasks(todoListID: string) {
        return instance.get<TasksType>(`todo-lists/${todoListID}/tasks`)
    },
    createTask(todoListID: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todoListID}/tasks`, {title})
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<CommonResponseType<{}>>(`/todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTask(todoListID: string, taskID: string, newTask: UpdatedDomainTaskModel) {
        return instance.put<CommonResponseType<{ item: TaskType }>>(`/todo-lists/${todoListID}/tasks/${taskID}`, {...newTask})
    },
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{ userId: number }>>('/auth/login', data)
    },
    authMe() {
        return instance.get<CommonResponseType<UserType>>('auth/me')
    },
    logout() {
       return instance.delete<CommonResponseType<{}>>('/auth/login')
    },
}

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type CommonResponseType<T> = {
    fieldsErrors: string[]
    resultCode: number
    messages: string[]
    data: T
}
type TasksType = {
    error: null | string
    items: TaskType []
    totalCount: 0
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}
export type UpdatedDomainTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type UserType = {
    id: number
    email: string
    login: string
}