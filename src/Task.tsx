import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskTC,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "./store/tasks-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TaskPropsType = {
    todoListID: string
    taskID: string
}

export const Task: FC<TaskPropsType> = memo(({todoListID, taskID}) => {

    const task = useSelector<AppStateType, TaskType>(state => state.tasks[todoListID].filter(t => t.id === taskID)[0])
    const dispatch = useDispatch<Dispatch<any>>()

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todoListID, taskID))
    }, [dispatch, todoListID, taskID])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let taskStatus = e.currentTarget.checked
        dispatch(updateTaskStatusTC(todoListID, taskID, taskStatus ? TaskStatuses.Completed : TaskStatuses.New));
    }, [dispatch, todoListID, taskID])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTitleTC(todoListID, taskID, title));
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