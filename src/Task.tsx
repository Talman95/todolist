import React, {ChangeEvent, FC} from 'react';
import {EditableSpan} from "./EditableSpan";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";

type TaskPropsType = {
    taskID: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, status: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

export const Task: FC<TaskPropsType> = (
    {
        taskID, title, isDone,
        removeTask, changeTaskStatus,
        changeTaskTitle
    }
) => {
    const onClickRemoveTask = () => {
        removeTask(taskID);
    }
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(taskID, e.currentTarget.checked);
    }
    const onChangeTaskTitle = (newTitle: string) => {
        changeTaskTitle(taskID, newTitle)
    }
    return (
        <ListItem divider>
            <Checkbox
                checked={isDone}
                color={"primary"}
                size={"small"}
                onChange={onChangeTaskStatus}
            />
            <span className={isDone ? "is-done" : ""}>
                <EditableSpan title={title} changeTitle={onChangeTaskTitle}/>
            </span>
            <IconButton
                onClick={onClickRemoveTask}
                size={"small"}
            >
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
};