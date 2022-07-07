import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {removeTask, updateTask} from "./tasks-reducer";
import {TaskStatuses} from "../../../../api/todolist-api";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks/hooks";

type TaskPropsType = {
    todoListID: string
    taskID: string
}

export const Task: FC<TaskPropsType> = memo(({todoListID, taskID}) => {
    const task = useAppSelector(state => state.tasks[todoListID].filter(t => t.id === taskID)[0])
    const dispatch = useAppDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTask({todoId: todoListID, taskId: taskID}))
    }, [dispatch, todoListID, taskID])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let taskStatus = e.currentTarget.checked
        const status = taskStatus ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTask({todoId: todoListID, taskId: taskID, model: {status}}))
    }, [dispatch, todoListID, taskID])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTask({todoId: todoListID, taskId: taskID, model: {title}}))
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
                onClick={removeTaskHandler}
                size={"small"}
            >
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});