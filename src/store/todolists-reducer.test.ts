import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";

let todoListID1 = v1()
let todoListID2 = v1()

test('correct todolist should be removed', () => {

    let startState: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filterValue: 'All'},
        {id: todoListID2, title: 'What to learn', filterValue: 'All'}
    ]

    let endState = todoListsReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test('correct todolist should be added', () => {

    let startState: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filterValue: 'All'},
        {id: todoListID2, title: 'What to learn', filterValue: 'All'}
    ]

    let endState = todoListsReducer(startState, addTodoListAC('Test title'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('Test title')
})

test('correct todolist should be changed title', () => {

    let startState: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filterValue: 'All'},
        {id: todoListID2, title: 'What to learn', filterValue: 'All'}
    ]

    let endState = todoListsReducer(startState, changeTodoListTitleAC(todoListID1, 'Test title'))

    expect(endState[0].title).toBe('Test title')
})

test('correct todolist filter should be changed', () => {

    let startState: TodoListType[] = [
        {id: todoListID1, title: 'What to learn', filterValue: 'All'},
        {id: todoListID2, title: 'What to learn', filterValue: 'All'}
    ]

    let endState = todoListsReducer(startState, changeTodoListFilterAC(todoListID1, 'Active'))

    expect(endState[0].filterValue).toBe('Active')
})