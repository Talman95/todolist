import React, { memo } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import { RequestStatusType } from 'app/app.reducer';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';

type TodolistHeaderPropsType = {
  title: string;
  removeTodoList: () => void;
  changeTodoListTitle: (title: string) => void;
  entityStatus: RequestStatusType;
};

export const TodolistHeader = memo(
  ({
    title,
    removeTodoList,
    changeTodoListTitle,
    entityStatus,
  }: TodolistHeaderPropsType) => {
    return (
      <h3 style={{ textAlign: 'center' }}>
        <EditableSpan
          title={title}
          changeTitle={changeTodoListTitle}
          disabled={entityStatus === 'loading'}
        />
        <IconButton
          onClick={removeTodoList}
          disabled={entityStatus === 'loading'}
          style={{ position: 'absolute', right: '7px', top: '21px' }}
        >
          <DeleteIcon />
        </IconButton>
      </h3>
    );
  },
);
