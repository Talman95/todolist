import {
    AddTaskAC,
    ChangeStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";

test("task should be deleted", () => {
    const startState: TasksStateType = {
        ['todoListID1']: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "CSS", isDone: true},
            {id: '3', title: "JS", isDone: true}
        ],
        ['todoListID2']: [
            {id: '4', title: 'MILK', isDone: true},
            {id: '5', title: 'BREAD', isDone: true},
            {id: '6', title: 'BEER', isDone: false}
        ]
    }

    const action = RemoveTaskAC('todoListID1', '1')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        ['todoListID1']: [
            {id: '2', title: "CSS", isDone: true},
            {id: '3', title: "JS", isDone: true}
        ],
        ['todoListID2']: [
            {id: '4', title: 'MILK', isDone: true},
            {id: '5', title: 'BREAD', isDone: true},
            {id: '6', title: 'BEER', isDone: false}
        ]
    })
})

test("correct task should be added", () => {
    const startState: TasksStateType = {
        ['todoListID1']: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "CSS", isDone: true},
            {id: '3', title: "JS", isDone: true}
        ],
        ['todoListID2']: [
            {id: '4', title: 'MILK', isDone: true},
            {id: '5', title: 'BREAD', isDone: true},
            {id: '6', title: 'BEER', isDone: false}
        ]
    }

    const action = AddTaskAC('todoListID1', 'ReactJS')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListID1'].length).toBe(4)
    expect(endState['todoListID1'][0].id).toBeDefined()
    expect(endState['todoListID1'][0].title).toBe('ReactJS')
    expect(endState['todoListID1'][0].isDone).toBe(false)
})

test('correct task should change status', () => {
    const startState: TasksStateType = {
        ['todoListID1']: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "CSS", isDone: true},
            {id: '3', title: "JS", isDone: true}
        ],
        ['todoListID2']: [
            {id: '4', title: 'MILK', isDone: true},
            {id: '5', title: 'BREAD', isDone: true},
            {id: '6', title: 'BEER', isDone: false}
        ]
    }

    const action = ChangeStatusAC('todoListID1', '1', false)

    const endState = tasksReducer(startState, action)

    expect(endState['todoListID1'][0].isDone).toBe(false)
})

test('correct task should change title', () => {
    const startState: TasksStateType = {
        ['todoListID1']: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "CSS", isDone: true},
            {id: '3', title: "JS", isDone: true}
        ],
        ['todoListID2']: [
            {id: '4', title: 'MILK', isDone: true},
            {id: '5', title: 'BREAD', isDone: true},
            {id: '6', title: 'BEER', isDone: false}
        ]
    }

    const action = ChangeTaskTitleAC('todoListID1', '1', 'ReactJS')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListID1'][0].title).toBe('ReactJS')
})