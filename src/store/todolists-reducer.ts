import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodoListsStateType = {
    id: string
    title: string
    filterValue: FilterValuesType
}

type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST'
    todoListID: string
}
type AddTodoListActionType = {
    type: 'ADD_TODOLIST'
    title: string
}
type TodoListChangeTitleActionType = {
    type: 'TODOLIST_CHANGE_TITLE'
    todoListID: string
    title: string
}
type ChangeFilterValueActionType = {
    type: 'CHANGE_FILTER_VALUE'
    todoListID: string
    filterValue: FilterValuesType
}

type ActionType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    TodoListChangeTitleActionType |
    ChangeFilterValueActionType

export const todoListsReducer = (state: TodoListsStateType[], action: ActionType): TodoListsStateType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID)
        case 'ADD_TODOLIST':
            const todoListID = v1()
            const newTodoList: TodoListsStateType = {
                id: todoListID,
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

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => (
    {type: 'REMOVE_TODOLIST', todoListID}
)
export const AddTodoListAC = (title: string): AddTodoListActionType => (
    {type: 'ADD_TODOLIST', title}
)
export const TodoListChangeTitleAC = (todoListID: string, title: string): TodoListChangeTitleActionType => (
    {type: 'TODOLIST_CHANGE_TITLE', todoListID, title}
)
export const ChangeFilterValueAC = (todoListID: string, filterValue: FilterValuesType): ChangeFilterValueActionType => (
    {type: 'CHANGE_FILTER_VALUE', todoListID, filterValue}
)