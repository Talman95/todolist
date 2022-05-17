import {appReducer, AppReducerStateType, setAppStatus, setAppErrorMessage} from "./app-reducer";


let startState: AppReducerStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        errorMessage: null,
    }
})

test('status should change', () => {
    const action = setAppStatus('loading')

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
})

test('error message should be set', () => {
    const action = setAppErrorMessage('error message')
    const endState = appReducer(startState, action)
    expect(endState.errorMessage).toBe('error message')
})