import React from 'react';
import {MyButton} from "./components/MyButton";
import {MyCheckbox} from "./components/MyCheckbox";

type PropsType = {
    taskID: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, status: boolean) => void
}

export const Task: React.FC<PropsType> = (
    {
        taskID, title, isDone,
        removeTask, changeTaskStatus
    }
) => {
    const onClickRemoveTask = () => {
        removeTask(taskID);
    }
    const onChangeTaskStatus = (status: boolean) => {
        changeTaskStatus(taskID, status);
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
            <span>{title}</span>
        </li>
    );
};