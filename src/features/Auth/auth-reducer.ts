import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";
import {ThunkErrorType} from "../../utils/types";
import {authAPI} from "../../api/auth-api";
import {LoginParamsType} from "../../api/types";
import {appActions} from "../CommonActions/App";


const login = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, ThunkErrorType>
('auth/login', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
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
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
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

export const asyncActions = {
    login,
    logout,
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
    }
})