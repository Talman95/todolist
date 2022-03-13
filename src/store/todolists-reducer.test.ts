import {
    AddTodoListAC,
    ChangeFilterValueAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer,
    TodoListsStateType
} from "./todolists-reducer";
import {v1} from "uuid";

let todoListID1 = v1();
let todoListID2 = v1();
let startState: TodoListsStateType[];

beforeEach(() => {
    startState = [
        {id: todoListID1, title: 'What to learn', filterValue: 'All'},
        {id: todoListID2, title: 'What to buy', filterValue: 'All'}
    ]
})

test('correct todolist should be removed', () => {
    const action = RemoveTodoListAC(todoListID1)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test('correct todolist should be added', () => {
    const action = AddTodoListAC('What to read')

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(action.todoListID)
    expect(endState[2].title).toBe('What to read')
    expect(endState[2].filterValue).toBe('All')
})

test('correct todolist should change title', () => {
    const action = ChangeTodoListTitleAC(todoListID1, 'New title')

    const endState = todoListsReducer(startState, action)

    expect(endState).toEqual([
        {id: todoListID1, title: 'New title', filterValue: 'All'},
        {id: todoListID2, title: 'What to buy', filterValue: 'All'}
    ])
})

test('correct todolist should changed filter value', () => {
    const action = ChangeFilterValueAC(todoListID1, 'Active')

    const endState = todoListsReducer(startState, action)

    expect(endState).toEqual([
        {id: todoListID1, title: 'What to learn', filterValue: 'Active'},
        {id: todoListID2, title: 'What to buy', filterValue: 'All'}
    ])
})