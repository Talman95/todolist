import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {SnackbarCloseReason} from "@mui/material/Snackbar/Snackbar";
import {appActions} from "../../app/app.reducer";
import {selectErrorMessage} from "../../app/selectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const errorMessage = useAppSelector(selectErrorMessage)
    const dispatch = useAppDispatch()

    const isOpen = errorMessage !== null

    const handleClose = (event: React.SyntheticEvent<any> | Event, reason?: SnackbarCloseReason) => {
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
