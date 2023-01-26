import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {useAppSelector} from "../../../../utils/hooks/hooks";
import {useActions} from "../../../../utils/hooks/useActions";
import {tasksActions} from "../../index";
import {TaskStatuses} from "../../../../api/types";
import {Box, Checkbox, Chip, IconButton, ListItem, ListItemSecondaryAction, Stack} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {taskModalActions} from "../../../TaskModal";
import {priorityUtils} from "../../../../utils/priority-utils";
import {colorUtils} from "../../../../utils/color-utils";

type TaskPropsType = {
    todoListID: string
    taskID: string
}

export const Task: FC<TaskPropsType> = memo(({todoListID, taskID}) => {
    const task = useAppSelector(state => state.tasks[todoListID].filter(t => t.id === taskID)[0])

    const {removeTask, updateTask} = useActions(tasksActions)
    const {openModalTask} = useActions(taskModalActions)

    const removeTaskHandler = useCallback(() => {
        removeTask({todoId: todoListID, taskId: taskID})
    }, [])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todoId: todoListID,
            taskId: taskID,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }, [])

    // const changeTaskTitle = useCallback(async (title: string) => {
    //     const thunk = tasksActions.updateTask({todoId: todoListID, taskId: taskID, model: {title}})
    //     const resultAction = await dispatch(thunk)
    //
    //     if (tasksActions.updateTask.rejected.match(resultAction)) {
    //         if (resultAction.payload?.errors?.length) {
    //             throw new Error(resultAction.payload.errors[0])
    //         } else {
    //             throw new Error('Some error occurred')
    //         }
    //     }
    // }, [])

    const onOpenModalTaskClick = () => {
        openModalTask(task)
    }

    return (
        <ListItem divider>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color={"primary"}
                size={"small"}
                onChange={changeTaskStatus}
            />
            <Box onClick={onOpenModalTaskClick} style={{cursor: 'pointer'}}>
            <span className={task.status === TaskStatuses.Completed ? "is-done" : ""}
                  style={{overflowWrap: "anywhere", textAlign: "start", width: '180px'}}>
                {task.title}
            </span>
                <Stack direction={'row'} spacing={1}>
                    {task.description &&
                        <Chip label={'Desc'} size={'small'} color={'primary'} style={{cursor: 'pointer'}}/>}
                    {(task.priority || task.priority === 0) &&
                        <Chip
                            label={priorityUtils(task.priority)}
                            size={'small'}
                            color={colorUtils(task.priority)}
                            style={{cursor: 'pointer'}}
                        />}
                </Stack>
            </Box>
            <ListItemSecondaryAction>
                <IconButton
                    onClick={removeTaskHandler}
                    size={"small"}
                >
                    <DeleteOutlineIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
})