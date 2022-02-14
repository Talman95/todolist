import React from 'react';
import {MyButton} from "./components/MyButton";

type PropsType = {
    title: string
    todoListID: string
    removeTodoList: (todoListID: string) => void
}

export const TaskHeader: React.FC<PropsType> = (
    {
        title, todoListID, removeTodoList
    }
) => {
    const onClickRemoveTodoList = () => {
        removeTodoList(todoListID);
    }
    return (
        <div className={'task-header'}>
            <h3>{title}</h3>
            <MyButton name={'X'} callback={onClickRemoveTodoList} />
        </div>
    );
};