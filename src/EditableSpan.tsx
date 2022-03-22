import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({title, changeTitle}) => {

    const [titleSpan, setTitleSpan] = useState<string>(title);
    const [editMode, setEditMode] = useState<boolean>(false);

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        let trimTitle = titleSpan.trim();
        if (trimTitle !== '') {
            changeTitle(trimTitle);
            setEditMode(false);
        }
    }
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }
    const onChangeSetUserText = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleSpan(e.currentTarget.value);
    }

    return (
        <span>
            {editMode
                ?
                <TextField
                    autoFocus
                    value={titleSpan}
                    onChange={onChangeSetUserText}
                    onBlur={offEditMode}
                    onKeyPress={onEnterPress}
                    style={{width: "85%"}}
                />
                :
                <span onDoubleClick={onEditMode}>
                    {titleSpan}
                </span>
            }
        </span>
    );
});