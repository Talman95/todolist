import React, {FC, memo, useCallback, useEffect} from 'react';
import {Task} from "./Task/Task";
import {TodolistHeader} from "./TodoListHeader/TodolistHeader";
import {ButtonsBlock} from "./ButtonsBlock/ButtonsBlock";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {List} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {addTaskTC, fetchTasksTC} from "./Task/tasks-reducer";
import {
    changeFilterValueAC,
    FilterValuesType,
    removeTodoListTC,
    TodoListsStateType,
    updateTodoListTitleTC
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {RequestStatusType} from "../../app/app-reducer";

type TodoListPropsType = {
    todoListID: string
    entityStatus: RequestStatusType
    demo?: boolean
}

export const Todolist: FC<TodoListPropsType> = memo(({demo, entityStatus, ...props}) => {
    let tasks = useSelector<AppStateType, TaskType[]>(state => state.tasks[props.todoListID])

    const todoList = useSelector<AppStateType, TodoListsStateType>(state =>
        state.todoLists.filter(tl => tl.id === props.todoListID)[0])

    const dispatch = useDispatch<Dispatch<any>>()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(todoList.id))
    }, [])

    if (todoList.filterValue === "Active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (todoList.filterValue === "Completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
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
        dispatch(removeTodoListTC(props.todoListID))
    }, [dispatch, props.todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(updateTodoListTitleTC(props.todoListID, title))
    }, [dispatch, props.todoListID])

    const onClickSetFilter = useCallback((filterValue: FilterValuesType) => {
        dispatch(changeFilterValueAC(props.todoListID, filterValue));
    }, [dispatch, props.todoListID])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todoListID, title))
    }, [dispatch, props.todoListID])

    return (
        <div className={'todolist'}>
            <TodolistHeader
                title={todoList.title}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
                entityStatus={entityStatus}
            />
            <AddItemForm addItem={addTask} disabled={entityStatus === 'loading'}/>
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