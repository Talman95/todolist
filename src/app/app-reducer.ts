import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedIn} from "../features/Auth/auth-reducer";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        errorMessage: null,
        isInitialized: false,
    } as AppReducerStateType,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorMessage: (state, action: PayloadAction<{ errorMessage: string | null }>) => {
            state.errorMessage = action.payload.errorMessage
        },
        setInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        },
    },
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppErrorMessage, setInitialized} = slice.actions

//thunks
export const initializeApp = createAsyncThunk('app/initializeApp', async (param,
                                                                          {dispatch, rejectWithValue}
) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.authMe()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setInitialized(true))
    } catch (err) {
        handleNetworkError(err, dispatch)
        return rejectWithValue({})
    }
})
export const asyncActions = {initializeApp}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitialized: boolean
}
export type AppReducerActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppErrorMessage>
