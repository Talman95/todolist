import React, { memo, useCallback, useEffect } from 'react';

import { List } from '@mui/material';

import { tasksThunks } from '../tasks.reducer';
import {
  todoListsThunks,
  todoListsActions,
  FilterValuesType,
  TodoListsStateType,
} from '../todoLists.reducer';

import { ButtonsBlock } from './ButtonsBlock/ButtonsBlock';
import { Task } from './Task/Task';
import { TodolistHeader } from './TodoListHeader/TodolistHeader';

import { TaskStatuses, TaskType } from 'api/types';
import { AddItemForm, AddItemFormHelperType } from 'components/AddItemForm/AddItemForm';
import { useActions } from 'hooks/useActions';
import { useAppDispatch } from 'hooks/useAppDispatch';

type TodoListPropsType = {
  todo: TodoListsStateType;
  tasks: TaskType[];
  demo?: boolean;
};

export const Todolist = memo(({ todo, tasks, demo }: TodoListPropsType) => {
  const { id, filterValue, title, entityStatus } = todo;

  const dispatch = useAppDispatch();

  const { removeTodoList, updateTodoListTitle } = useActions(todoListsThunks);
  const { changeFilterValue } = useActions(todoListsActions);
  const { fetchTasks } = useActions(tasksThunks);

  let tasksForFilter = tasks;

  useEffect(() => {
    if (demo) {
      return;
    }
    fetchTasks(id);
  }, []);

  if (filterValue === 'Active') {
    tasksForFilter = tasks.filter(t => t.status === TaskStatuses.New);
  }
  if (filterValue === 'Completed') {
    tasksForFilter = tasks.filter(t => t.status === TaskStatuses.Completed);
  }

  const removeTodoListHandler = useCallback(() => {
    removeTodoList(id);
  }, []);

  const changeTodoListTitle = useCallback(async (newTitle: string) => {
    const thunk = updateTodoListTitle({ todoId: id, title: newTitle });
    const resultAction = await dispatch(thunk);

    if (updateTodoListTitle.rejected.match(resultAction)) {
      if (resultAction.payload?.errors?.length) {
        throw new Error(resultAction.payload.errors[0]);
      } else {
        throw new Error('Some error occurred');
      }
    }
  }, []);

  const onClickSetFilter = useCallback((filter: FilterValuesType) => {
    changeFilterValue({ id, filter });
  }, []);

  const addTaskHandler = useCallback(
    async (newTitle: string, helper: AddItemFormHelperType) => {
      const thunk = tasksThunks.addTask({ todoId: id, title: newTitle });
      const resultAction = await dispatch(thunk);

      if (tasksThunks.addTask.rejected.match(resultAction)) {
        if (resultAction.payload) {
          if (resultAction.payload.errors?.length) {
            const errorMessage = resultAction.payload.errors[0];

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

  const tasksComponents = tasksForFilter.map(t => {
    return <Task key={t.id} todoId={id} task={t} />;
  });

  return (
    <div className="todolist">
      <TodolistHeader
        title={title}
        removeTodoList={removeTodoListHandler}
        changeTodoListTitle={changeTodoListTitle}
        entityStatus={entityStatus}
      />
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === 'loading'} />
      <List style={{ maxHeight: '380px', overflowY: 'auto' }}>
        {tasks.length > 0 ? (
          tasksComponents
        ) : (
          <div style={{ padding: '10px', color: 'grey' }}>No task</div>
        )}
      </List>
      <ButtonsBlock filterValue={filterValue} setFilterValue={onClickSetFilter} />
    </div>
  );
});
