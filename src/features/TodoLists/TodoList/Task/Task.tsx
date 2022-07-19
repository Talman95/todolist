import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {TaskStatuses} from "../../../../api/todolist-api";
import {useAppSelector} from "../../../../app/hooks/hooks";
import {useActions} from "../../../../app/hooks/useActions";
import {tasksActions} from "../../index";

type TaskPropsType = {
    todoListID: string
    taskID: string
}

export const Task: FC<TaskPropsType> = memo(({todoListID, taskID}) => {
    const task = useAppSelector(state => state.tasks[todoListID].filter(t => t.id === taskID)[0])
    const {removeTask, updateTask} = useActions(tasksActions)

    const removeTaskHandler = useCallback(() => {
        removeTask({todoId: todoListID, taskId: taskID})
    }, [])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let taskStatus = e.currentTarget.checked
        const status = taskStatus ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({todoId: todoListID, taskId: taskID, model: {status}})
    }, [])

    const changeTaskTitle = useCallback((title: string) => {
        updateTask({todoId: todoListID, taskId: taskID, model: {title}})
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
            <IconButton
                onClick={removeTaskHandler}
                size={"small"}
            >
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});