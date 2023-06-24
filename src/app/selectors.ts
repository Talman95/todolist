import { RootState } from 'types/types';

export const selectStatus = (state: RootState) => state.app.status;
export const selectIsInitialized = (state: RootState) => state.app.isInitialized;
export const selectErrorMessage = (state: RootState) => state.app.errorMessage;
