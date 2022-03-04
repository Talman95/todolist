import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodoListsStateType = {
    id: string
    title: string
    filterValue: FilterValuesType
}

export type RemoveTodoListType = {
    type: 'REMOVE_TODOLIST'
    todoListID: string
}
export type AddTodoListType = {
    type: 'ADD_TODOLIST'
    title: string
    todoListID: string
}
type TodoListChangeTitleType = {
    type: 'TODOLIST_CHANGE_TITLE'
    todoListID: string
    title: string
}
type ChangeFilterValueType = {
    type: 'CHANGE_FILTER_VALUE'
    todoListID: string
    filterValue: FilterValuesType
}

type ActionType =
    RemoveTodoListType |
    AddTodoListType |
    TodoListChangeTitleType |
    ChangeFilterValueType

export const todoListsReducer = (state: TodoListsStateType[], action: ActionType): TodoListsStateType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)
        case 'ADD_TODOLIST':
            const newTodoList: TodoListsStateType = {
                id: action.todoListID,
                title: action.title,
                filterValue: 'All'
            }
            return [...state, newTodoList]
        case 'TODOLIST_CHANGE_TITLE':
            return state.map(
                tl => tl.id === action.todoListID
                    ?
                    {...tl, title: action.title}
                    :
                    tl
            )
        case 'CHANGE_FILTER_VALUE':
            return state.map(
                tl => tl.id === action.todoListID
                    ?
                    {...tl, filterValue: action.filterValue}
                    :
                    tl
            )
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListType => (
    {type: 'REMOVE_TODOLIST', todoListID}
)
export const AddTodoListAC = (title: string): AddTodoListType => (
    {type: 'ADD_TODOLIST', title, todoListID: v1()}
)
export const TodoListChangeTitleAC = (todoListID: string, title: string): TodoListChangeTitleType => (
    {type: 'TODOLIST_CHANGE_TITLE', todoListID, title}
)
export const ChangeFilterValueAC = (todoListID: string, filterValue: FilterValuesType): ChangeFilterValueType => (
    {type: 'CHANGE_FILTER_VALUE', todoListID, filterValue}
)