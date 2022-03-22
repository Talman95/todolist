import React, {FC, memo, useCallback} from 'react';
import {Task} from "./Task";
import {TodolistHeader} from "./TodolistHeader";
import {ButtonsBlock} from "./ButtonsBlock";
import {AddItemForm} from "./AddItemForm";
import {List} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {AddTaskAC, TaskType} from "./store/tasks-reducer";
import {
    ChangeFilterValueAC,
    ChangeTodoListTitleAC,
    FilterValuesType,
    RemoveTodoListAC, TodoListsStateType
} from "./store/todolists-reducer";
import {Dispatch} from "redux";

type TodoListPropsType = {
    todoListID: string
}

export const Todolist: FC<TodoListPropsType> = memo((props) => {

    let tasks = useSelector<AppStateType, TaskType[]>(state => state.tasks[props.todoListID])

    const todoList = useSelector<AppStateType, TodoListsStateType>(state =>
        state.todoLists.filter(tl => tl.id === props.todoListID)[0])

    const dispatch = useDispatch<Dispatch>()

    if (todoList.filterValue === "Active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (todoList.filterValue === "Completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const tasksComponents = tasks.map(t => {
        return (
            <Task
                key={t.id}
                todoListID={todoList.id}
                taskID={t.id}
            />
        )
    })

    const removeTodoList = useCallback(() => {
        dispatch(RemoveTodoListAC(props.todoListID))
    }, [dispatch, props.todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(ChangeTodoListTitleAC(props.todoListID, title))
    }, [dispatch, props.todoListID])

    const onClickSetFilter = useCallback((filterValue: FilterValuesType) => {
        dispatch(ChangeFilterValueAC(props.todoListID, filterValue));
    }, [dispatch, props.todoListID])

    const addTask = useCallback((title: string) => {
        dispatch(AddTaskAC(props.todoListID, title))
    }, [dispatch, props.todoListID])

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
})