import {addTodoListAC, todoListsReducer, TodoListsStateType} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodoListType} from "../api/todolist-api";

test('IDs should be equals', () => {
    const startTodoListsState: TodoListsStateType[] = []
    const startTasksState: TasksStateType = {}

    const todoList: TodoListType = {
        id: '111-111',
        addedDate: '',
        order: 1,
        title: 'What to read'
    }

    const action = addTodoListAC(todoList)

    const endTodoListsState = todoListsReducer(startTodoListsState, action)
    const endTasksState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodoLists).toBe(action.todoList.id)
})