import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AppReducerStateType = {
    status: 'idle',
    errorMessage: null,
}

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorMessage: (state, action: PayloadAction<{ errorMessage: string | null }>) => {
            state.errorMessage = action.payload.errorMessage
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppErrorMessage} = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerStateType = {
    status: RequestStatusType
    errorMessage: string | null
}
export type AppReducerActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorMessage>
