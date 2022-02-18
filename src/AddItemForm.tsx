import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (
    {addItem}
) => {

    const [title, setTitleForm] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onClickAddItem = () => {
        let trimTitle = title.trim();
        if (trimTitle !== '') {
            addItem(trimTitle);
        } else {
            setError(true);
        }
        setTitleForm('');
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleForm(e.currentTarget.value);
        setError(false);
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
            />
            <IconButton
                onClick={onClickAddItem}
                color={'primary'}
            >
                <AddBoxOutlinedIcon/>
            </IconButton>
        </div>
    );
};