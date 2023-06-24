import { RootState } from 'app/store';

export const selectCurrentTask = (state: RootState) => state.modal.currentTask;
