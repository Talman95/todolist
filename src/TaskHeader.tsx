import React from 'react';
import {MyButton} from "./components/MyButton";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string
    todoListID: string
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export const TaskHeader: React.FC<PropsType> = (
    {
        title, todoListID,
        removeTodoList, changeTodoListTitle
    }
) => {
    const onClickRemoveTodoList = () => {
        removeTodoList(todoListID);
    }
    const onChangeTodoListTitle = (title: string) => {
        changeTodoListTitle(todoListID, title);
    }
    return (
        <div className={'task-header'}>
            <EditableSpan
                title={title}
                changeTitle={onChangeTodoListTitle}
            />
            <MyButton
                name={'X'}
                callback={onClickRemoveTodoList}
            />
        </div>
    );
};