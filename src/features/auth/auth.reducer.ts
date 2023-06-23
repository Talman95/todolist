import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {ThunkErrorType} from "../../types/types";
import {authAPI} from "../../api/auth-api";
import {LoginParamsType} from "../../api/types";
import {appActions} from "../../app/app.reducer";

const {setAppStatus} = appActions

const login = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, ThunkErrorType>
('auth/login', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        handleNetworkError(err, dispatch)
        return rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }
})

const logout = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (err) {
        handleNetworkError(err, dispatch)
        return rejectWithValue({})
    }
})

export const initializeApp = createAsyncThunk(
    'app/initializeApp',
    async (param, {dispatch, rejectWithValue}) => {
        try {
            const res = await authAPI.authMe()
            if (res.data.resultCode === 0) {
                return {isLoggedIn: true}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err) {
            handleNetworkError(err, dispatch)
            return rejectWithValue({})
        } finally {
            dispatch(appActions.setAppInitialized({isInitialized: true}))
        }
    })

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {
    login,
    logout,
    initializeApp,
}
