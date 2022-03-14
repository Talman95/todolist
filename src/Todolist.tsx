import React, {FC} from 'react';
import {Task} from "./Task";
import {TodolistHeader} from "./TodolistHeader";
import {ButtonsBlock} from "./ButtonsBlock";
import {AddItemForm} from "./AddItemForm";
import {List} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {FilterValueType, TaskType, TodoListType} from "./AppWithRedux";
import {AddTaskAC, ChangeStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./store/tasks-reducer";
import {ChangeFilterValueAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todolists-reducer";

type TodoListPropsType = {
    todoListID: string
}

export const Todolist: FC<TodoListPropsType> = (props) => {

    let tasks = useSelector<AppStateType, TaskType[]>(state => state.tasks[props.todoListID])
    const todoList = useSelector<AppStateType, TodoListType>(state =>
        state.todoLists.filter(tl => tl.id === props.todoListID)[0])

    const dispatch = useDispatch()

    if (todoList.filterValue === "Active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (todoList.filterValue === "Completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const tasksComponents = tasks.map(t => {

        const removeTask = (taskID: string) => {
            dispatch(RemoveTaskAC(props.todoListID, taskID))
        }
        const changeTaskStatus = (taskID: string, status: boolean) => {
            dispatch(ChangeStatusAC(props.todoListID, taskID, status));
        }
        const changeTaskTitle = (taskID: string, title: string) => {
            dispatch(ChangeTaskTitleAC(props.todoListID, taskID, title));
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

    const removeTodoList = () => {
        dispatch(RemoveTodoListAC(props.todoListID))
    }
    const changeTodoListTitle = () => (title: string) => {
        dispatch(ChangeTodoListTitleAC(props.todoListID, title))
    }
    const onClickSetFilter = (filterValue: FilterValueType) => () => {
        dispatch(ChangeFilterValueAC(props.todoListID, filterValue));
    }
    const addTask = (title: string) => {
        dispatch(AddTaskAC(props.todoListID, title))
    }

    return (
        <div className={'todolist'}>
            <TodolistHeader
                title={todoList.title}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
            />
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksComponents}
            </List>
            <ButtonsBlock
                filterValue={todoList.filterValue}
                setFilterValue={onClickSetFilter}
            />
        </div>
    )
}
