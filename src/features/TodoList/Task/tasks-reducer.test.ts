import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, TodoListType} from "../../../api/todolist-api";

let todoListID1 = v1()
let todoListID2 = v1()
let startState: TasksStateType

beforeEach(() => {
    startState = {
        [todoListID1]: [
            {
                id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1
            },
            {
                id: '2', title: "CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1
            },
            {
                id: '3', title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1
            }
        ],
        [todoListID2]: [
            {
                id: '4', title: 'MILK', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2
            },
            {
                id: '5', title: 'BREAD', status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2
            },
            {
                id: '6', title: 'BEER', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2
            }
        ]
    }
})

test("task should be deleted", () => {
    const action = removeTaskAC(todoListID1, '1')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todoListID1]: [
            {
                id: '2', title: "CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1
            },
            {
                id: '3', title: "JS", status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1
            }
        ],
        [todoListID2]: [
            {
                id: '4', title: 'MILK', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2
            },
            {
                id: '5', title: 'BREAD', status: TaskStatuses.Completed, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2
            },
            {
                id: '6', title: 'BEER', status: TaskStatuses.New, addedDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID2
            }
        ]
    })
})

test("correct task should be added", () => {
    const newTask: TaskType = {
        id: '123123',
        title: 'ReactJS',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID1,
    }
    const action = addTaskAC(todoListID1, newTask)

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID1][0].id).toBeDefined()
    expect(endState[todoListID1][0].title).toBe('ReactJS')
    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
})

test('correct task should change status', () => {
    const action = changeTaskStatusAC(todoListID1, '1', TaskStatuses.New)

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
})

test('correct task should change title', () => {
    const action = changeTaskTitleAC(todoListID1, '1', 'ReactJS')

    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].title).toBe('ReactJS')
})

test('new array should be added when new todolist is added', () => {
    const todoList: TodoListType = {
        id: '111-111',
        addedDate: '',
        order: 1,
        title: 'What to read'
    }

    const action = addTodoListAC({todoList})

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(endState[action.payload.todoList.id]).toEqual([])
})

test('property with todolist should be deleted', () => {
    const action = removeTodoListAC({id: todoListID2})

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListID2]).not.toBeDefined()
})
test('correct tasks should be initialization during set todolists', () => {
    const action = setTodoListsAC({todoLists: [
        {id: 'todolistId1', addedDate: '', order: 0, title: 'What to learn'},
    ]})

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId1']).toStrictEqual([])
})


test('correct tasks should be added for todolist', () => {
    const action = setTasksAC('todolistId1', [
        {
            id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
            description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1
        },
        {
            id: '2', title: "CSS", status: TaskStatuses.Completed, addedDate: '', deadline: '',
            description: '', order: 0, priority: TaskPriorities.Low, startDate: '', todoListId: todoListID1
        },
    ])

    const endState = tasksReducer({['todolistId1']: []}, action)

    const keys = Object.keys(endState['todolistId1'])

    expect(keys.length).toBe(2)
    expect(endState['todolistId1'][0].id).toBe('1')
    expect(endState['todolistId1'][1].id).toBe('2')
})

