import {
    TodoListsStateType,
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListType} from "../../api/types";
import {todoListsActions, todoListsReducer} from "./index";

const {
    fetchTodoLists,
    removeTodoList,
    addTodoList,
    updateTodoListTitle,
    changeFilterValue,
} = todoListsActions

let todoListID1 = v1();
let todoListID2 = v1();
let startState: TodoListsStateType[];

beforeEach(() => {
    startState = [
        {id: todoListID1, addedDate: '', order: 0, title: 'What to learn', filterValue: 'All', entityStatus: 'idle'},
        {id: todoListID2, addedDate: '', order: 0, title: 'What to buy', filterValue: 'All', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const action = removeTodoList.fulfilled(todoListID1, 'requestId', todoListID1)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test('correct todolist should be added', () => {
    const todoListID = v1()
    const todoList: TodoListType = {
        id: todoListID,
        addedDate: '',
        order: 1,
        title: 'What to read'
    }
    const action = addTodoList.fulfilled(todoList, 'requestId', todoList.title)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe(todoListID)
    expect(endState[0].title).toBe('What to read')
    expect(endState[0].filterValue).toBe('All')
})

test('correct todolist should change title', () => {
    const param = {todoId: todoListID1, title: 'What to watch'}
    const action = updateTodoListTitle.fulfilled(param, 'requestId', param)

    const endState = todoListsReducer(startState, action)

    expect(endState).toEqual([
        {id: todoListID1, addedDate: '', order: 0, title: 'What to watch', filterValue: 'All', entityStatus: 'idle'},
        {id: todoListID2, addedDate: '', order: 0, title: 'What to buy', filterValue: 'All', entityStatus: 'idle'}
    ])
})

test('correct todolist should changed filter value', () => {
    const action = changeFilterValue({id: todoListID1, filter: 'Active'})

    const endState = todoListsReducer(startState, action)

    expect(endState).toEqual([
        {id: todoListID1, addedDate: '', order: 0, title: 'What to learn', filterValue: 'Active', entityStatus: 'idle'},
        {id: todoListID2, addedDate: '', order: 0, title: 'What to buy', filterValue: 'All', entityStatus: 'idle'}
    ])
})

test('correct todolist should be set to the state', () => {
    const action = fetchTodoLists.fulfilled(startState, 'requestId')

    const endState = todoListsReducer([], action)

    expect(endState.length).toBe(2)
})