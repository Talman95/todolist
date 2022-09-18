import {asyncActions, TodoListsStateType} from "./todolists-reducer";
import {slice, TasksStateType} from "./TodoList/Task/tasks-reducer";
import {TodoListType} from "../../api/types";
import {todoListsReducer} from "./index";

let startTodoListsState: TodoListsStateType[] = []
let startTasksState: TasksStateType = {}

const tasksReducer = slice.reducer

beforeEach(() => {
    startTodoListsState = []
    startTasksState = {}
})

test('IDs should be equals', () => {

    const todoList: TodoListType = {
        id: '111-111',
        addedDate: '',
        order: 1,
        title: 'What to read'
    }
    const action = asyncActions.addTodoList.fulfilled(todoList, 'requestId', todoList.title)

    const endTodoListsState = todoListsReducer(startTodoListsState, action)
    const endTasksState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodoLists).toBe(action.payload.id)
})

test('correct during set todolists IDs should be equals', () => {
    const action = asyncActions.fetchTodoLists.fulfilled([
        {id: 'todolistId1', addedDate: '', order: 0, title: 'What to learn'},
        {id: 'todolistId2', addedDate: '', order: 0, title: 'What to buy'}
    ], 'requestId')

    const endTodoListsState = todoListsReducer(startTodoListsState, action)
    const endTasksState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe('todolistId1')
    expect(idFromTodoLists).toBe('todolistId1')
})