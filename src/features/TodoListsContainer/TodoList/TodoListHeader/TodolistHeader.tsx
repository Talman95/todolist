import React, {FC, memo} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {RequestStatusType} from "../../../../app/app-reducer";

type TodolistHeaderPropsType = {
    title: string
    removeTodoList: () => void
    changeTodoListTitle: (title: string) => void
    entityStatus: RequestStatusType
}

export const TodolistHeader: FC<TodolistHeaderPropsType> = memo(({
                                                                     title,
                                                                     removeTodoList,
                                                                     changeTodoListTitle,
                                                                     entityStatus
                                                                 }) => {
    return (
        <h3 style={{textAlign: "center"}}>
            <EditableSpan
                title={title}
                changeTitle={changeTodoListTitle}
                disabled={entityStatus === 'loading'}
            />
            <IconButton
                onClick={removeTodoList}
                disabled={entityStatus === 'loading'}
            >
                <DeleteIcon/>
            </IconButton>
        </h3>
    );
});