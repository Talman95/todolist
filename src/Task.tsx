import React from 'react';

type PropsType = {
    taskID: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
}

export const Task: React.FC<PropsType> = (
    {
        taskID, title, isDone,
        removeTask
    }
) => {
    const onRemoveTaskHandler = () => {
        removeTask(taskID);
    }
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <button onClick={onRemoveTaskHandler}>X</button>
            <span>{title}</span>
        </li>
    );
};