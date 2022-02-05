import React, {KeyboardEvent, useState} from 'react';
import {Task} from "./Task";
import {FilterValueType, TaskType} from "./App";
import {TaskHeader} from "./TaskHeader";
import {MyButton} from "./components/MyButton";
import {MyInput} from "./components/MyInput";

type PropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: boolean) => void
    filterValue: FilterValueType
    changeFilterValue: (todoListID: string, filter: FilterValueType) => void
}

export const Todolist: React.FC<PropsType> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const removeTaskHandler = (taskID: string) => {
        props.removeTask(props.todoListID, taskID)
    }
    const changeTaskStatusHandler = (taskID: string, status: boolean) => {
        props.changeTaskStatus(props.todoListID, taskID, status);
    }

    const mappedTasks = props.tasks.map(t => {
        return (
            <Task
                key={t.id}
                taskID={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={removeTaskHandler}
                changeTaskStatus={changeTaskStatusHandler}
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
            props.addTask(props.todoListID, trimTitle);
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
        props.changeFilterValue(props.todoListID, filterValue);
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
