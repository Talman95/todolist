import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';

import { TextField } from '@mui/material';

type EditableSpanPropsType = {
  title: string;
  changeTitle: (title: string) => void;
  disabled?: boolean;
};

export const EditableSpan = memo<EditableSpanPropsType>(
  ({ title, changeTitle, disabled = false }: EditableSpanPropsType) => {
    const [titleSpan, setTitleSpan] = useState(title);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState<string | null>('');

    const onEditMode = () => {
      if (disabled) {
        return;
      }
      setEditMode(true);
    };
    const offEditMode = async () => {
      if (titleSpan.trim() !== '') {
        try {
          await changeTitle(titleSpan);
          setEditMode(false);
          error && setError(null);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        offEditMode();
      }
    };
    const onChangeSetUserText = (e: ChangeEvent<HTMLInputElement>) => {
      setTitleSpan(e.currentTarget.value);
    };

    return (
      <div style={{ wordWrap: 'break-word', padding: '0 20px', marginRight: '15px' }}>
        {editMode ? (
          <TextField
            autoFocus
            value={titleSpan}
            onChange={onChangeSetUserText}
            onBlur={offEditMode}
            onKeyPress={onEnterPress}
            multiline
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
            style={{ textAlign: 'end' }}
          />
        ) : (
          <div
            onDoubleClick={onEditMode}
            style={{ overflowWrap: 'anywhere', textAlign: 'start' }}
          >
            {titleSpan}
          </div>
        )}
      </div>
    );
  },
);
