import { Dispatch } from 'redux';

import { CommonResponseType } from 'api/types';
import { appActions } from 'app/app.reducer';

const { setAppError, setAppStatus } = appActions;

type DispatchType = Dispatch<
  ReturnType<typeof setAppError> | ReturnType<typeof setAppStatus>
>;
type ThunkAPIType = {
  dispatch: DispatchType;
  // eslint-disable-next-line @typescript-eslint/ban-types
  rejectWithValue: Function;
};

export const handleServerAppError = <T>(
  data: CommonResponseType<T>,
  dispatch: DispatchType,
  showError = true,
) => {
  if (showError) {
    if (data.messages.length) {
      dispatch(setAppError({ error: data.messages[0] }));
    } else {
      dispatch(setAppError({ error: 'Some error occurred' }));
    }
  }
  dispatch(setAppStatus({ status: 'failed' }));
};

export const handleNetworkError = (
  err: any,
  dispatch: DispatchType,
  showError = true,
) => {
  if (showError) {
    if (err.message) {
      dispatch(setAppError(err.message));
    } else {
      dispatch(setAppError({ error: 'Some error occurred' }));
    }
  }
  dispatch(setAppStatus({ status: 'failed' }));
};

export const handleAsyncServerAppError = <T>(
  data: CommonResponseType<T>,
  thunkAPI: ThunkAPIType,
  showError = true,
) => {
  if (showError) {
    if (data.messages.length) {
      thunkAPI.dispatch(setAppError({ error: data.messages[0] }));
    } else {
      thunkAPI.dispatch(setAppError({ error: 'Some error occurred' }));
    }
  }
  thunkAPI.dispatch(setAppStatus({ status: 'failed' }));

  return thunkAPI.rejectWithValue({
    errors: data.messages,
    fieldsErrors: data.fieldsErrors,
  });
};

export const handleAsyncNetworkError = (
  err: any,
  thunkAPI: ThunkAPIType,
  showError = true,
) => {
  if (showError) {
    if (err.message) {
      thunkAPI.dispatch(setAppError(err.message));
    } else {
      thunkAPI.dispatch(setAppError({ error: 'Some error occurred' }));
    }
  }
  thunkAPI.dispatch(setAppStatus({ status: 'failed' }));

  return thunkAPI.rejectWithValue({ errors: [err.message], fieldsErrors: undefined });
};
