import React from 'react';
import {Task} from "./Task";
import {FilterValueType, TaskType} from "./App";
import {TaskHeader} from "./TaskHeader";
import {ButtonsBlock} from "./ButtonsBlock";
import {AddItemForm} from "./AddItemForm";

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

export const Todolist: React.FC<TodoListPropsType> = (props) => {

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

    const onClickSetFilter = (filterValue: FilterValueType) => {
        props.changeFilterValue(props.todoListID, filterValue);
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    return (
        <div>
            <TaskHeader
                title={props.title}
                todoListID={props.todoListID}
                removeTodoList={props.removeTodoList}
                changeTodoListTitle={props.changeTodoListTitle}
            />
            <AddItemForm addTask={addTask}/>
            {tasksComponents.length > 0
                ?
                <ul>{tasksComponents}</ul>
                :
                <div className={'not-found'}>
                    Tasks not found
                </div>
            }
            <ButtonsBlock
                filterValue={props.filterValue}
                onClickSetFilter={onClickSetFilter}
            />
        </div>
    )
}
