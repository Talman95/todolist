import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Task} from "./Task";
import {FilterValueType, TaskType} from "./App";
import {TaskHeader} from "./TaskHeader";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, status: boolean) => void
    setFilterValue: (filter: FilterValueType) => void
}

export const Todolist: React.FC<PropsType> = (props) => {
    const [title, setTitle] = useState<string>('');

    const mappedTasks = props.tasks.map(t => {
        return (
            <Task
                key={t.id}
                taskID={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
        )
    })

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onClickAddTask = () => {
        let trimTitle = title.trim();
        if (trimTitle !== '') {
            props.addTask(title);
        }
        setTitle('');
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask();
        }
    }
    const onClickSetFilter = (filterValue: FilterValueType) => {
        props.setFilterValue(filterValue);
    }

    return (
        <div>
            <TaskHeader title={props.title}/>
            <div>
                <input
                    value={title}
                    onChange={onChangeTaskTitle}
                    onKeyPress={onEnterPressHandler}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            {mappedTasks.length>0
                ?
                <ul>{mappedTasks}</ul>
                :
                <div>Tasks not found</div>
            }

            <div>
                <button
                    onClick={() => onClickSetFilter('All')}
                >All
                </button>
                <button
                    onClick={() => onClickSetFilter('Active')}
                >Active
                </button>
                <button
                    onClick={() => onClickSetFilter('Completed')}
                >Completed
                </button>
            </div>
        </div>
    )
}
