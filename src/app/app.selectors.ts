import { RootState } from 'app/store';

export const selectStatus = (state: RootState) => state.app.status;
export const selectIsInitialized = (state: RootState) => state.app.isInitialized;
export const selectErrorMessage = (state: RootState) => state.app.errorMessage;
