import React, {KeyboardEvent, useState} from 'react';
import {Task} from "./Task";
import {FilterValueType, TaskType} from "./App";
import {TaskHeader} from "./TaskHeader";
import {MyButton} from "./components/MyButton";
import {MyInput} from "./components/MyInput";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, status: boolean) => void
    setFilterValue: (filter: FilterValueType) => void
    filterValue: FilterValueType
}

export const Todolist: React.FC<PropsType> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

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

    const onChangeTaskTitle = (message: string) => {
        setTitle(message);
        setError(false);
    }
    const onClickAddTask = () => {
        let trimTitle = title.trim();
        if (trimTitle !== '') {
            props.addTask(trimTitle);
        } else {
            setError(true);
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
    const inputClassName = error ? 'error' : '';

    return (
        <div>
            <TaskHeader title={props.title}/>
            <div>
                <MyInput
                    value={title}
                    onChangeCallback={onChangeTaskTitle}
                    onKeyPressCallback={onEnterPressHandler}
                    className={inputClassName}
                />
                <MyButton
                    name={'+'}
                    callback={onClickAddTask}
                />
                <div className={'error-message'}>
                    {error && 'Title is require!'}
                </div>
            </div>
            {mappedTasks.length > 0
                ?
                <ul>{mappedTasks}</ul>
                :
                <div className={'not-found'}>
                    Tasks not found
                </div>
            }

            <div>
                <MyButton
                    name={'All'}
                    callback={() => onClickSetFilter('All')}
                    className={props.filterValue === 'All' ? 'active-filter' : ''}
                />
                <MyButton
                    name={'Active'}
                    callback={() => onClickSetFilter('Active')}
                    className={props.filterValue === 'Active' ? 'active-filter' : ''}
                />
                <MyButton
                    name={'Completed'}
                    callback={() => onClickSetFilter('Completed')}
                    className={props.filterValue === 'Completed' ? 'active-filter' : ''}
                />
            </div>
        </div>
    )
}
