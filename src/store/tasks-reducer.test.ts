import {
    AddTaskAC,
    ChangeStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let todoListID1 = v1()
let todoListID2 = v1()
let startState: TasksStateType

beforeEach(() => {
    startState = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1},
            {id: '2', title: "CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1},
            {id: '3', title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1}
        ],
        [todoListID2]: [
            {id: '4', title: 'MILK', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2},
            {id: '5', title: 'BREAD', status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2},
            {id: '6', title: 'BEER', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2}
        ]
    }
})

test("task should be deleted", () => {
    const action = RemoveTaskAC(todoListID1, '1')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todoListID1]: [
            {id: '2', title: "CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1},
            {id: '3', title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1}
        ],
        [todoListID2]: [
            {id: '4', title: 'MILK', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2},
            {id: '5', title: 'BREAD', status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2},
            {id: '6', title: 'BEER', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2}
        ]
    })
})

test("correct task should be added", () => {
    const action = AddTaskAC(todoListID1, 'ReactJS')

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID1][0].id).toBeDefined()
    expect(endState[todoListID1][0].title).toBe('ReactJS')
    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
})

test('correct task should change status', () => {
    const action = ChangeStatusAC(todoListID1, '1', TaskStatuses.New)

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
})

test('correct task should change title', () => {
    const action = ChangeTaskTitleAC(todoListID1, '1', 'ReactJS')

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].title).toBe('ReactJS')
})

test('new array should be added when new todolist is added', () => {
    const action = AddTodoListAC('New todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(endState[action.todoListID]).toEqual([])
})

test('property with todolist should be deleted', () => {
    const action = RemoveTodoListAC(todoListID2)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListID2]).not.toBeDefined()
})