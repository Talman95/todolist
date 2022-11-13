import React from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {TaskPriorities} from "../../api/types";
import {useFormik} from "formik";
import {tasksActions} from "../TodoLists";
import {useActions} from "../../utils/hooks/useActions";
import {taskModalActions} from "./index";
import ListIcon from '@mui/icons-material/List';
import DescriptionIcon from '@mui/icons-material/Description';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const priorityValues = ['Low', 'Middle', 'High', 'Urgently', 'Later']

export const TaskModal = () => {
    const dispatch = useAppDispatch()

    const task = useAppSelector(state => state.modal.currentTask)

    const {closeModalTask} = useActions(taskModalActions)

    const formik = useFormik({
        initialValues: {
            title: task?.title || '',
            description: task?.description || '',
            priority: task?.priority || TaskPriorities.Low,
            deadline: task?.deadline,
        },
        onSubmit: async (values) => {
            alert(JSON.stringify(values))

            const thunk = tasksActions.updateTask({
                todoId: task?.todoListId || '',
                taskId: task?.id || '',
                model: {
                    title: values.title,
                    description: values.description,
                    priority: +values.priority,
                },
            })
            const resultAction = await dispatch(thunk)

            if (tasksActions.updateTask.rejected.match(resultAction)) {
                if (resultAction.payload?.errors?.length) {
                    throw new Error(resultAction.payload.errors[0])
                } else {
                    throw new Error('Some error occurred')
                }
            } else {
                closeModalTask()
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl style={{width: '100%'}}>
                <FormGroup>

                    <Stack direction={'row'} style={{margin: '16px 0'}}>
                        <ListIcon color={'primary'}/>
                        <Typography>
                            Task
                        </Typography>
                    </Stack>
                    <TextField fullWidth
                               {...formik.getFieldProps('title')}
                    />

                    <Stack direction={'row'} style={{margin: '16px 0'}}>
                        <DescriptionIcon color={'primary'}/>
                        <Typography>
                            Description
                        </Typography>
                    </Stack>
                    <TextField fullWidth
                               placeholder={'Add description'}
                               {...formik.getFieldProps('description')}
                    />

                    <Stack direction={'row'} style={{margin: '16px 0'}}>
                        <PriorityHighIcon color={'primary'}/>
                        <Typography>
                            Priority
                        </Typography>
                    </Stack>
                    <RadioGroup
                        row
                        {...formik.getFieldProps('priority')}
                    >
                        {priorityValues.map((p, index) =>
                            <FormControlLabel key={index} value={index} control={<Radio/>} label={p}/>
                        )}
                    </RadioGroup>

                </FormGroup>
                <Button variant={'contained'} color={'primary'} type={'submit'}>
                    Save
                </Button>
            </FormControl>
        </form>
    )
}