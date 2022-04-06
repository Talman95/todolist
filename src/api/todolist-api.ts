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
        return instance.post<CreateTodoResponseType>('todo-lists', {title})
    },
    deleteTodolist(todoListID: string) {
        return instance.delete<DeleteAndUpdateTodoResponseType>(`todo-lists/${todoListID}`)
    },
    updateTodolist(todoListID: string, title: string) {
        return instance.put<DeleteAndUpdateTodoResponseType>(`todo-lists/${todoListID}`, {title})
    },
}

type TodosType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodoResponseType = {
    data: {
        item: TodosType
    }
    fieldsErrors: string[]
    resultCode: number
    messages: string[]
}
type DeleteAndUpdateTodoResponseType = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}