import {
    AddTodoListAC, ChangeFilterValueAC,
    RemoveTodoListAC,
    TodoListChangeTitleAC,
    todoListsReducer,
    TodoListsStateType
} from "./todolists-reducer";


test('correct todolist should be removed', () => {
    const startState: TodoListsStateType[] = [
        {id: 'todoListID1', title: 'What to learn', filterValue: 'All'},
        {id: 'todoListID2', title: 'What to buy', filterValue: 'All'}
    ]

    const action = RemoveTodoListAC('todoListID1')

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('todoListID2')
})

test('correct todolist should be added', () => {
    const startState: TodoListsStateType[] = [
        {id: 'todoListID1', title: 'What to learn', filterValue: 'All'},
        {id: 'todoListID2', title: 'What to buy', filterValue: 'All'}
    ]

    const action = AddTodoListAC('What to read')

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(action.todoListID)
    expect(endState[2].title).toBe('What to read')
    expect(endState[2].filterValue).toBe('All')
})

test('correct todolist should change title', () => {
    const startState: TodoListsStateType[] = [
        {id: 'todoListID1', title: 'What to learn', filterValue: 'All'},
        {id: 'todoListID2', title: 'What to buy', filterValue: 'All'}
    ]

    const action = TodoListChangeTitleAC('todoListID1', 'New title')

    const endState = todoListsReducer(startState, action)

    expect(endState).toEqual([
        {id: 'todoListID1', title: 'New title', filterValue: 'All'},
        {id: 'todoListID2', title: 'What to buy', filterValue: 'All'}
    ])
})

test('correct todolist should changed filter value', () => {
    const startState: TodoListsStateType[] = [
        {id: 'todoListID1', title: 'What to learn', filterValue: 'All'},
        {id: 'todoListID2', title: 'What to buy', filterValue: 'All'}
    ]
    const action = ChangeFilterValueAC('todoListID1', 'Active')

    const endState = todoListsReducer(startState, action)

    expect(endState).toEqual([
        {id: 'todoListID1', title: 'What to learn', filterValue: 'Active'},
        {id: 'todoListID2', title: 'What to buy', filterValue: 'All'}
    ])
})