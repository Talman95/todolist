import React, {FC, KeyboardEvent, useState} from 'react';
import {MyInput} from "./components/MyInput";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (
    {title, changeTitle}
) => {

    const [titleSpan, setTitleSpan] = useState<string>(title);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        let trimTitle = titleSpan.trim();
        if (trimTitle !== '') {
            changeTitle(trimTitle);
            setEditMode(false);
        } else {
            setError(true);
        }
    }
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }
    const onChangeSpanTitle = (newTitle: string) => {
        setTitleSpan(newTitle);
        setError(false);
    }
    const inputClassName = error ? 'error' : '';

    return (
        <span>
            {editMode
                ?
                <MyInput
                    value={titleSpan}
                    onChangeCallback={onChangeSpanTitle}
                    onKeyPressCallback={onEnterPress}
                    className={inputClassName}
                    onBlurCallback={offEditMode}
                    autoFocus={true}
                />
                :
                <span
                    onDoubleClick={onEditMode}
                >
                    {titleSpan}
                </span>
            }
        </span>
    );
};