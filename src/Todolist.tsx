import React from 'react';
import {Task} from "./Task";
import {FilterValueType, TaskType} from "./App";
import {TaskHeader} from "./TaskHeader";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    setFilterValue: (filter: FilterValueType) => void
}

export const Todolist: React.FC<PropsType> = (props) => {
    const mappedTasks = props.tasks.map(t => {
        return (
            <Task
                key={t.id}
                taskID={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={props.removeTask}
            />
        )
    })
    const setFilterForTasks = (filterValue: FilterValueType) => {
        props.setFilterValue(filterValue);
    }

    return (
        <div>
            <TaskHeader title={props.title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={() => setFilterForTasks('All')}>All</button>
                <button onClick={() => setFilterForTasks('Active')}>Active</button>
                <button onClick={() => setFilterForTasks('Completed')}>Completed</button>
            </div>
        </div>
    )
}
