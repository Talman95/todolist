import React, {FC, memo, useCallback, useEffect} from 'react';
import {Task} from "./Task/Task";
import {TodolistHeader} from "./TodoListHeader/TodolistHeader";
import {ButtonsBlock} from "./ButtonsBlock/ButtonsBlock";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {List} from "@material-ui/core";
import {addTask, fetchTasks} from "./Task/tasks-reducer";
import {changeFilterValue, FilterValuesType, removeTodoList, updateTodoListTitle} from "../todolists-reducer";
import {TaskStatuses} from "../../../api/todolist-api";
import {RequestStatusType} from "../../../app/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";

type TodoListPropsType = {
    todoListID: string
    entityStatus: RequestStatusType
    demo?: boolean
}

export const Todolist: FC<TodoListPropsType> = memo(({demo, entityStatus, ...props}) => {
    let tasks = useAppSelector(state => state.tasks[props.todoListID])
    const todoList = useAppSelector(state =>
        state.todoLists.filter(tl => tl.id === props.todoListID)[0])

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasks(todoList.id))
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

    const removeTodoListHandler = useCallback(() => {
        dispatch(removeTodoList(props.todoListID))
    }, [dispatch, props.todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(updateTodoListTitle({todoId: props.todoListID, title}))
    }, [dispatch, props.todoListID])

    const onClickSetFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeFilterValue({id: props.todoListID, filter}));
    }, [dispatch, props.todoListID])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask({todoId: props.todoListID, title}))
    }, [dispatch, props.todoListID])

    return (
        <div className={'todolist'}>
            <TodolistHeader
                title={todoList.title}
                removeTodoList={removeTodoListHandler}
                changeTodoListTitle={changeTodoListTitle}
                entityStatus={entityStatus}
            />
            <AddItemForm addItem={addTaskHandler} disabled={entityStatus === 'loading'}/>
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