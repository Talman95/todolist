import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({addItem, disabled = false}) => {

    const [title, setTitleForm] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onClickAddItem = () => {
        let trimTitle = title.trim();
        if (trimTitle !== '') {
            addItem(trimTitle);
        } else {
            !error && setError(true);
        }
        setTitleForm('');
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitleForm(e.currentTarget.value);
    }
    const onEnterPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem();
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <TextField
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onEnterPressAddItem}
                label={"Title"}
                error={error}
                variant={"outlined"}
                size={"small"}
                helperText={error && "Title is required!"}
                disabled={disabled}
            />
            <IconButton
                onClick={onClickAddItem}
                color={'primary'}
                disabled={disabled}
            >
                <AddBoxOutlinedIcon/>
            </IconButton>
        </div>
    );
})