import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton, TextField } from '@mui/material';

export type AddItemFormHelperType = {
  setError: (error: string) => void;
  setTitle: (title: string) => void;
};
type AddItemFormPropsType = {
  addItem: (title: string, helper: AddItemFormHelperType) => void;
  disabled?: boolean;
};

export const AddItemForm: FC<AddItemFormPropsType> = memo(
  ({ addItem, disabled = false }: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onClickAddItem = () => {
      if (title.trim() !== '') {
        addItem(title, { setError, setTitle });
      } else {
        setError('Title is required!');
      }
    };
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      error && setError(null);
      setTitle(e.currentTarget.value);
    };
    const onEnterPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onClickAddItem();
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <TextField
          value={title}
          onChange={onChangeSetTitle}
          onKeyPress={onEnterPressAddItem}
          label="Title"
          error={!!error}
          variant="outlined"
          size="small"
          helperText={error}
          disabled={disabled}
        />
        <IconButton onClick={onClickAddItem} color="primary" disabled={disabled}>
          <AddBoxIcon />
        </IconButton>
      </div>
    );
  },
);
