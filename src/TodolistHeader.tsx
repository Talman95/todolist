import React, {FC} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

type TodolistHeaderPropsType = {
    title: string
    todoListID: string
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const TodolistHeader: FC<TodolistHeaderPropsType> = (
    {
        title, todoListID,
        removeTodoList, changeTodoListTitle
    }
) => {
    const onClickRemoveTodoList = () => {
        removeTodoList(todoListID)
    }
    const onChangeTodoListTitle = (title: string) => {
        changeTodoListTitle(todoListID, title)
    }

    return (
        <h3 style={{textAlign: "center"}}>
            <EditableSpan
                title={title}
                changeTitle={onChangeTodoListTitle}
            />
            <IconButton
                onClick={onClickRemoveTodoList}
            >
                <DeleteIcon/>
            </IconButton>
        </h3>
    );
};