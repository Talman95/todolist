import {AppReducerStateType} from "./app.reducer";
import {appActions, appReducer} from "./app.reducer";


let startState: AppReducerStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        errorMessage: null,
        isInitialized: true,
    }
})

test('status should change', () => {
    const action = appActions.setAppStatus({status: 'loading'})

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
})

test('error message should be set', () => {
    const action = appActions.setAppError({error: 'error message'})
    const endState = appReducer(startState, action)
    expect(endState.errorMessage).toBe('error message')
})
