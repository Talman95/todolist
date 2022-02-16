import React from 'react';
import {MyButton} from "./components/MyButton";
import {MyCheckbox} from "./components/MyCheckbox";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    taskID: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, status: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

export const Task: React.FC<TaskPropsType> = (
    {
        taskID, title, isDone,
        removeTask, changeTaskStatus,
        changeTaskTitle
    }
) => {
    const onClickRemoveTask = () => {
        removeTask(taskID);
    }
    const onChangeTaskStatus = (status: boolean) => {
        changeTaskStatus(taskID, status);
    }
    const onChangeTaskTitle = (newTitle: string) => {
        changeTaskTitle(taskID, newTitle)
    }
    return (
        <li className={isDone ? 'is-done': ''}>
            <MyCheckbox
                status={isDone}
                callback={onChangeTaskStatus}
            />
            <MyButton
                name={'X'}
                callback={onClickRemoveTask}
            />
            <EditableSpan title={title} changeTitle={onChangeTaskTitle} />
        </li>
    );
};