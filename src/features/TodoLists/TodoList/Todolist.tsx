import React, {FC, memo, useCallback, useEffect} from 'react';
import {Task} from "./Task/Task";
import {TodolistHeader} from "./TodoListHeader/TodolistHeader";
import {ButtonsBlock} from "./ButtonsBlock/ButtonsBlock";
import {AddItemForm, AddItemFormHelperType} from "../../../components/AddItemForm/AddItemForm";
import {List} from "@material-ui/core";
import {FilterValuesType} from "../todolists-reducer";
import {RequestStatusType} from "../../Application/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {useActions} from "../../../utils/hooks/useActions";
import {tasksActions, todoListsActions} from "../index";
import {authActions} from "../../Auth";
import {TaskStatuses} from "../../../api/types";

type TodoListPropsType = {
    todoListID: string
    entityStatus: RequestStatusType
    demo?: boolean
}

export const Todolist: FC<TodoListPropsType> = memo(({demo, entityStatus, ...props}) => {
    let tasks = useAppSelector(state => state.tasks[props.todoListID])
    const todoList = useAppSelector(state => state.todoLists.filter(tl => tl.id === props.todoListID)[0])
    const dispatch = useAppDispatch()

    const {removeTodoList, updateTodoListTitle, changeFilterValue} = useActions(todoListsActions)
    const {fetchTasks} = useActions(tasksActions)

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

    const changeTodoListTitle = useCallback(async (title: string) => {
        const thunk = updateTodoListTitle({todoId: props.todoListID, title})
        const resultAction = await dispatch(thunk)

        if (updateTodoListTitle.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                throw new Error(resultAction.payload.errors[0])
            } else {
                throw new Error('Some error occurred')
            }
        }
    }, [])

    const onClickSetFilter = useCallback((filter: FilterValuesType) => {
        changeFilterValue({id: props.todoListID, filter});
    }, [])

    const addTaskHandler = useCallback(async (title: string, helper: AddItemFormHelperType) => {
        const thunk = tasksActions.addTask({todoId: props.todoListID, title})
        const resultAction = await dispatch(thunk)

        if (tasksActions.addTask.rejected.match(resultAction)) {
            if (resultAction.payload) {
                if (resultAction.payload.errors?.length) {
                    const errorMessage = resultAction.payload.errors[0]
                    helper.setError(errorMessage)
                } else {
                    helper.setError('Some error occurred')
                }
            }
        } else {
            helper.setTitle('')
        }
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