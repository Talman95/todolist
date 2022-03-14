import React, {FC} from 'react';
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

type TodolistHeaderPropsType = {
    title: string
    removeTodoList: () => void
    changeTodoListTitle: () => (title: string) => void
}

export const TodolistHeader: FC<TodolistHeaderPropsType> = ({title, removeTodoList, changeTodoListTitle}) => {
    return (
        <h3 style={{textAlign: "center"}}>
            <EditableSpan
                title={title}
                changeTitle={changeTodoListTitle}
            />
            <IconButton
                onClick={removeTodoList}
            >
                <DeleteIcon/>
            </IconButton>
        </h3>
    );
};