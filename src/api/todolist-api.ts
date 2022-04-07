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
        return instance.get<TodosType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodosType }>>('todo-lists', {title})
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
    updateTask(todoListID: string, taskID: string, newTask: UpdatedTaskModel) {
        return instance.put<CommonResponseType<{ item: TaskType }>>(`/todo-lists/${todoListID}/tasks/${taskID}`, {...newTask})
    },
}

type TodosType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CommonResponseType<T> = {
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
type TaskType = {
    addedDate: string
    deadline: any
    description: any
    id: string
    order: number
    priority: number
    startDate: any
    status: number
    title: string
    todoListId: string
}
type UpdatedTaskModel = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}