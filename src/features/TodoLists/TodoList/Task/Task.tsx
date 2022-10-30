import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {useActions} from "../../../../utils/hooks/useActions";
import {tasksActions} from "../../index";
import {TaskStatuses} from "../../../../api/types";
import {Checkbox, IconButton, ListItem, ListItemSecondaryAction} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type TaskPropsType = {
    todoListID: string
    taskID: string
}

export const Task: FC<TaskPropsType> = memo(({todoListID, taskID}) => {
    const task = useAppSelector(state => state.tasks[todoListID].filter(t => t.id === taskID)[0])
    const dispatch = useAppDispatch()
    const {removeTask, updateTask} = useActions(tasksActions)

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

    const changeTaskTitle = useCallback(async(title: string) => {
        const thunk = tasksActions.updateTask({todoId: todoListID, taskId: taskID, model: {title}})
        const resultAction = await dispatch(thunk)

        if (tasksActions.updateTask.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                throw new Error(resultAction.payload.errors[0])
            } else {
                throw new Error('Some error occurred')
            }
        }
    }, [])

    return (
        <ListItem divider>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color={"primary"}
                size={"small"}
                onChange={changeTaskStatus}
            />
            <span className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            </span>
            <ListItemSecondaryAction>
                <IconButton
                    onClick={removeTaskHandler}
                    size={"small"}
                >
                    <DeleteOutlineIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
});