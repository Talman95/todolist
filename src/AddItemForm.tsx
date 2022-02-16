import React, {FC, KeyboardEvent, useState} from 'react';
import {MyInput} from "./components/MyInput";
import {MyButton} from "./components/MyButton";

type AddItemFormPropsType = {
    addTask: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (
    {addTask}
) => {

    const [titleForm, setTitleForm] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onClickAddItem = () => {
        let trimTitle = titleForm.trim();
        if (trimTitle !== '') {
            addTask(trimTitle);
        } else {
            setError(true);
        }
        setTitleForm('');
    }
    const onChangeTaskItem = (message: string) => {
        setTitleForm(message);
        setError(false);
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem();
        }
    }
    const inputClassName = error ? 'error' : '';

    return (
        <div>
            <MyInput
                value={titleForm}
                onChangeCallback={onChangeTaskItem}
                onKeyPressCallback={onEnterPressHandler}
                className={inputClassName}
            />
            <MyButton
                name={'+'}
                callback={onClickAddItem}
            />
            <div className={'error-message'}>
                {error && 'Title is require!'}
            </div>
        </div>
    );
};