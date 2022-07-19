import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {setAppStatus} from "../../app/app-reducer";
import {handleNetworkError, handleServerAppError} from "../../utils/error-utils";


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
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false
        })
    }
})

export const {setIsLoggedIn} = slice.actions
export const authReducer = slice.reducer

export const login = createAsyncThunk('auth/login', async (param: LoginParamsType, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
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
export const logout = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
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

export const asyncActions = {
    login,
    logout,
}