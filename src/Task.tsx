import React, {ChangeEvent} from 'react';

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
    const onChangeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(taskID, e.currentTarget.checked);
    }
    return (
        <li className={isDone ? 'is-done': ''}>
            <input
                type="checkbox"
                checked={isDone}
                onChange={onChangeTaskStatus}
            />
            <button onClick={onClickRemoveTask}>X</button>
            <span>{title}</span>
        </li>
    );
};