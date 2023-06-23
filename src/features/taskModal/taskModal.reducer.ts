import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskType} from "../../api/types";

export const slice = createSlice({
    name: 'taskModal',
    initialState: {
        currentTask: null as null | TaskType
    },
    reducers: {
        openModalTask: (state, action: PayloadAction<TaskType>) => {
            state.currentTask = action.payload
        },
        closeModalTask: (state) => {
            state.currentTask = null
        },
    },
})

export const taskModalReducer = slice.reducer
export const taskModalActions = slice.actions
