import {AddTodoListAC, todoListsReducer, TodoListsStateType} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test('IDs should be equals', () => {
    const startTodoListsState: TodoListsStateType[] = []
    const startTasksState: TasksStateType = {}

    const action = AddTodoListAC("New todolist")

    const endTodoListsState = todoListsReducer(startTodoListsState, action)
    const endTasksState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodoLists).toBe(action.todoListID)
})