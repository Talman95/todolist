import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {authAPI} from "../../api/auth-api";
import {appActions} from "../CommonActions/App";
import {authActions} from "../Auth";

export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (param, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAPI.authMe()
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedIn(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (err) {
            handleNetworkError(err, dispatch)
            return rejectWithValue({})
        }
    })

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        errorMessage: null,
        isInitialized: false,
    } as AppReducerStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isInitialized = true
            })
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.errorMessage = action.payload.error
            })
    }
})

export const asyncActions = {
    initializeApp
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppReducerStateType = {
    status: RequestStatusType
    errorMessage: string | null
    isInitialized: boolean
}