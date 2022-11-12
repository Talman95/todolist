import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useAppSelector} from "../../utils/hooks/hooks";

export const TaskModal = () => {

    const task = useAppSelector(state => state.modal.currentTask)

    return (
        <Box>
            <Typography variant="h6" component="h2">
                {task?.title}
            </Typography>
            <Button variant={'contained'} color={'primary'}>
                Save
            </Button>
        </Box>
    )
}
