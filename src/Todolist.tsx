import React, {FC} from 'react';
import {Task} from "./Task";
import {FilterValueType, TaskType} from "./App";
import {TodolistHeader} from "./TodolistHeader";
import {ButtonsBlock} from "./ButtonsBlock";
import {AddItemForm} from "./AddItemForm";
import {List} from "@material-ui/core";

type TodoListPropsType = {
    todoListID: string
    title: string
    filterValue: FilterValueType
    tasks: TaskType[]
    removeTask: (todoListID: string, taskID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: boolean) => void
    changeFilterValue: (todoListID: string, filter: FilterValueType) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const Todolist: FC<TodoListPropsType> = (props) => {

    const tasksComponents = props.tasks.map(t => {

        const removeTask = (taskID: string) => {
            props.removeTask(props.todoListID, taskID);
        }
        const changeTaskStatus = (taskID: string, status: boolean) => {
            props.changeTaskStatus(props.todoListID, taskID, status);
        }
        const changeTaskTitle = (taskID: string, title: string) => {
            props.changeTaskTitle(props.todoListID, taskID, title);
        }
        return (
            <Task
                key={t.id}
                taskID={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    const onClickSetFilter = (filterValue: FilterValueType) => () => {
        props.changeFilterValue(props.todoListID, filterValue);
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    return (
        <div className={'todolist'}>
            <TodolistHeader
                title={props.title}
                todoListID={props.todoListID}
                removeTodoList={props.removeTodoList}
                changeTodoListTitle={props.changeTodoListTitle}
            />
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksComponents}
            </List>
            <ButtonsBlock
                filterValue={props.filterValue}
                setFilterValue={onClickSetFilter}
            />
        </div>
    )
}
