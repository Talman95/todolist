import {setAppErrorMessage, setAppStatus} from "../app/app-reducer";
import {CommonResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

type DispatchType = Dispatch<ReturnType<typeof setAppErrorMessage> | ReturnType<typeof setAppStatus>>


export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: DispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorMessage({errorMessage: data.messages[0]}))
    } else {
        dispatch(setAppErrorMessage({errorMessage: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleNetworkError = (err: any, dispatch: DispatchType) => {
    if (err.message) {
        dispatch(setAppErrorMessage(err.message))
    } else {
        dispatch(setAppErrorMessage({errorMessage: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}