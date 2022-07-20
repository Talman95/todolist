import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    disabled?: boolean
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({title, changeTitle, disabled = false}) => {

    const [titleSpan, setTitleSpan] = useState(title);
    const [editMode, setEditMode] = useState(false);

    const onEditMode = () => {
        if (disabled) {
            return
        }
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
        <div style={{wordWrap: "break-word", textAlign: "start", padding: "0 20px", marginRight: "15px"}}>
            {editMode
                ?
                <TextField
                    autoFocus
                    value={titleSpan}
                    onChange={onChangeSetUserText}
                    onBlur={offEditMode}
                    onKeyPress={onEnterPress}
                    multiline
                    variant={"outlined"}
                    fullWidth
                />
                :
                <div onDoubleClick={onEditMode} style={{overflowWrap: "anywhere"}}>
                    {titleSpan}
                </div>
            }
        </div>
    );
});