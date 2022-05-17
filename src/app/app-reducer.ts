const initialState: AppReducerStateType = {
    status: 'idle',
    errorMessage: null,
}

export const appReducer = (state = initialState, action: AppReducerActionsType): AppReducerStateType => {
    switch (action.type) {
        case "SET_APP_STATUS":
            return {...state, status: action.status}
        case "SET_APP_ERROR_MESSAGE":
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}

//actions
export const setAppStatus = (status: RequestStatusType) => ({type: 'SET_APP_STATUS', status} as const)
export const setAppErrorMessage = (errorMessage: string | null) => ({type: 'SET_APP_ERROR_MESSAGE', errorMessage} as const)

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerStateType = {
    status: RequestStatusType
    errorMessage: string | null
}
export type AppReducerActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorMessage>
