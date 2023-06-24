import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    errorMessage: null,
    isInitialized: false,
  } as AppReducerStateType,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.errorMessage = action.payload.error;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppReducerStateType = {
  status: RequestStatusType;
  errorMessage: string | null;
  isInitialized: boolean;
};
