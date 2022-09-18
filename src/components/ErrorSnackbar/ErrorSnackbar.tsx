import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {appActions} from "../../features/CommonActions/App";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrorSnackbar = () => {
    const errorMessage = useAppSelector(state => state.app.errorMessage)
    const dispatch = useAppDispatch()

    const isOpen = errorMessage !== null

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(appActions.setAppError({error: null}))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}