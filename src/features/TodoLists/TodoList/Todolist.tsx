import React, {FC, memo, useCallback, useEffect} from 'react';
import {Task} from "./Task/Task";
import {TodolistHeader} from "./TodoListHeader/TodolistHeader";
import {ButtonsBlock} from "./ButtonsBlock/ButtonsBlock";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {List} from "@material-ui/core";
import {FilterValuesType} from "../todolists-reducer";
import {TaskStatuses} from "../../../api/todolist-api";
import {RequestStatusType} from "../../../app/app-reducer";
import {useAppSelector} from "../../../app/hooks/hooks";
import {useActions} from "../../../app/hooks/useActions";
import {tasksActions, todoListsActions} from "../index";

type TodoListPropsType = {
    todoListID: string
    entityStatus: RequestStatusType
    demo?: boolean
}

export const Todolist: FC<TodoListPropsType> = memo(({demo, entityStatus, ...props}) => {
    let tasks = useAppSelector(state => state.tasks[props.todoListID])
    const todoList = useAppSelector(state => state.todoLists.filter(tl => tl.id === props.todoListID)[0])

    const {removeTodoList, updateTodoListTitle, changeFilterValue} = useActions(todoListsActions)
    const {fetchTasks, addTask} = useActions(tasksActions)

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(todoList.id)
    }, [])

    if (todoList.filterValue === "Active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (todoList.filterValue === "Completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const removeTodoListHandler = useCallback(() => {
        removeTodoList(props.todoListID)
    }, [])

    const changeTodoListTitle = useCallback((title: string) => {
        updateTodoListTitle({todoId: props.todoListID, title})
    }, [])

    const onClickSetFilter = useCallback((filter: FilterValuesType) => {
        changeFilterValue({id: props.todoListID, filter});
    }, [])

    const addTaskHandler = useCallback((title: string) => {
        addTask({todoId: props.todoListID, title})
    }, [])

    const tasksComponents = tasks.map(t => {
        return (
            <Task
                key={t.id}
                todoListID={todoList.id}
                taskID={t.id}
            />
        )
    })

    return (
        <div className={'todolist'}>
            <TodolistHeader
                title={todoList.title}
                removeTodoList={removeTodoListHandler}
                changeTodoListTitle={changeTodoListTitle}
                entityStatus={entityStatus}
            />
            <AddItemForm addItem={addTaskHandler} disabled={entityStatus === 'loading'}/>
            <List style={{maxHeight: "380px", overflowY: "auto"}}>
                {tasks.length > 0
                    ? tasksComponents
                    : <div style={{padding: '10px', color: 'grey'}}>No task</div>
                }
            </List>
            <ButtonsBlock
                filterValue={todoList.filterValue}
                setFilterValue={onClickSetFilter}
            />
        </div>
    )
})