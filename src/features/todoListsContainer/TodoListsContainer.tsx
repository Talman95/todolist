import React, { FC, useCallback, useEffect } from 'react';

import { Grid, Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { Todolist } from './TodoList/Todolist';
import { todoListsThunks } from './todoLists.reducer';

import { AddItemForm, AddItemFormHelperType } from 'components/AddItemForm/AddItemForm';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import {
  selectTasks,
  selectTodoLists,
} from 'features/todoListsContainer/todoLists.selectors';
import { useActions } from 'hooks/useActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

type TodoListsContainerType = {
  demo?: boolean;
};

export const TodoListsContainer: FC<TodoListsContainerType> = ({ demo }) => {
  const dispatch = useAppDispatch();

  const todoLists = useAppSelector(selectTodoLists);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const tasks = useAppSelector(selectTasks);

  const { fetchTodoLists } = useActions(todoListsThunks);

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    fetchTodoLists();
  }, []);

  const addTodoListHandler = useCallback(
    async (title: string, helper: AddItemFormHelperType) => {
      const thunk = todoListsThunks.addTodoList(title);
      const action = await dispatch(thunk);

      if (todoListsThunks.addTodoList.rejected.match(action)) {
        if (action.payload) {
          if (action.payload?.errors?.length) {
            const errorMessage = action.payload.errors[0];

            helper.setError(errorMessage);
          } else {
            helper.setError('Some error occurred');
          }
        }
      } else {
        helper.setTitle('');
      }
    },
    [],
  );

  const todoListsComponents = todoLists.map(tl => {
    const tasksForTodoList = tasks[tl.id];

    return (
      <Grid item key={tl.id}>
        <Paper
          elevation={8}
          style={{ padding: '10px', width: '300px', position: 'relative' }}
        >
          <Todolist todo={tl} tasks={tasksForTodoList} demo={demo} />
        </Paper>
      </Grid>
    );
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid
        container
        spacing={3}
        style={{
          padding: '25px 0 5px 0',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
      >
        <AddItemForm addItem={addTodoListHandler} />
      </Grid>
      <Grid container spacing={6} style={{ flexWrap: 'nowrap' }}>
        {todoListsComponents}
      </Grid>
    </>
  );
};
