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

let todoListID1 = v1()
let todoListID2 = v1()
let startState: TasksStateType

beforeEach(() => {
    startState = {
        [todoListID1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "CSS", isDone: true},
            {id: '3', title: "JS", isDone: true}
        ],
        [todoListID2]: [
            {id: '4', title: 'MILK', isDone: true},
            {id: '5', title: 'BREAD', isDone: true},
            {id: '6', title: 'BEER', isDone: false}
        ]
    }
})

test("task should be deleted", () => {
    const action = RemoveTaskAC(todoListID1, '1')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todoListID1]: [
            {id: '2', title: "CSS", isDone: true},
            {id: '3', title: "JS", isDone: true}
        ],
        [todoListID2]: [
            {id: '4', title: 'MILK', isDone: true},
            {id: '5', title: 'BREAD', isDone: true},
            {id: '6', title: 'BEER', isDone: false}
        ]
    })
})

test("correct task should be added", () => {
    const action = AddTaskAC(todoListID1, 'ReactJS')

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID1][0].id).toBeDefined()
    expect(endState[todoListID1][0].title).toBe('ReactJS')
    expect(endState[todoListID1][0].isDone).toBe(false)
})

test('correct task should change status', () => {
    const action = ChangeStatusAC(todoListID1, '1', false)

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].isDone).toBe(false)
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