import {setAppErrorMessage, setAppStatus} from "../app/app-reducer";
import {CommonResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

type DispatchType = Dispatch<ReturnType<typeof setAppErrorMessage> | ReturnType<typeof setAppStatus>>
type ThunkAPIType = {
    dispatch: DispatchType
    rejectWithValue: Function
}


export const handleServerAppError = <T>(
    data: CommonResponseType<T>,
    dispatch: DispatchType,
    showError = true,
) => {
    if (showError) {
        if (data.messages.length) {
            dispatch(setAppErrorMessage({errorMessage: data.messages[0]}))
        } else {
            dispatch(setAppErrorMessage({errorMessage: 'Some error occurred'}))
        }
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleNetworkError = (
    err: any,
    dispatch: DispatchType,
    showError = true,
) => {
    if (showError) {
        if (err.message) {
            dispatch(setAppErrorMessage(err.message))
        } else {
            dispatch(setAppErrorMessage({errorMessage: 'Some error occurred'}))
        }
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleAsyncServerAppError = <T>(
    data: CommonResponseType<T>,
    thunkAPI: ThunkAPIType,
    showError = true,
) => {
    if (showError) {
        if (data.messages.length) {
            thunkAPI.dispatch(setAppErrorMessage({errorMessage: data.messages[0]}))
        } else {
            thunkAPI.dispatch(setAppErrorMessage({errorMessage: 'Some error occurred'}))
        }
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncNetworkError = (
    err: any,
    thunkAPI: ThunkAPIType,
    showError = true,
) => {
    if (showError) {
        if (err.message) {
            thunkAPI.dispatch(setAppErrorMessage(err.message))
        } else {
            thunkAPI.dispatch(setAppErrorMessage({errorMessage: 'Some error occurred'}))
        }
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
}