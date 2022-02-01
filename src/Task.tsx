import React from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    task: TaskType
}

export const Task: React.FC<PropsType> = ({task}) => {
    return (
        <li>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
        </li>
    );
};