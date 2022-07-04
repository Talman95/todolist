import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../../api/todolist-api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";

type TaskPropsType = {
    todoListID: string
    taskID: string
}

export const Task: FC<TaskPropsType> = memo(({todoListID, taskID}) => {
    const task = useAppSelector(state => state.tasks[todoListID].filter(t => t.id === taskID)[0])
    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todoListID, taskID))
    }, [dispatch, todoListID, taskID])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let taskStatus = e.currentTarget.checked
        dispatch(updateTaskTC(todoListID, taskID, {status: taskStatus ? TaskStatuses.Completed : TaskStatuses.New}));
    }, [dispatch, todoListID, taskID])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(todoListID, taskID, {title}));
    }, [dispatch, todoListID, taskID])

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
            <IconButton
                onClick={removeTask}
                size={"small"}
            >
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});