import React, { ChangeEvent, memo, useCallback } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  Stack,
} from '@mui/material';

import { taskModalActions } from '../../../taskModal/taskModal.reducer';
import { tasksThunks } from '../../tasks.reducer';

import { TaskStatuses } from 'api/types';
import { useActions } from 'hooks/useActions';
import { useAppSelector } from 'hooks/useAppSelector';
import { colorUtils } from 'utils/color-utils';
import { priorityUtils } from 'utils/priority-utils';

type TaskPropsType = {
  todoListID: string;
  taskID: string;
};

export const Task = memo(({ todoListID, taskID }: TaskPropsType) => {
  const task = useAppSelector(
    state => state.tasks[todoListID].filter(t => t.id === taskID)[0],
  );

  const { removeTask, updateTask } = useActions(tasksThunks);
  const { openModalTask } = useActions(taskModalActions);

  const removeTaskHandler = useCallback(() => {
    removeTask({ todoId: todoListID, taskId: taskID });
  }, []);

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      todoId: todoListID,
      taskId: taskID,
      model: {
        status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      },
    });
  }, []);

  const onOpenModalTaskClick = () => {
    openModalTask(task);
  };

  return (
    <ListItem divider>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="primary"
        size="small"
        onChange={changeTaskStatus}
      />
      <Box onClick={onOpenModalTaskClick} style={{ cursor: 'pointer' }}>
        <span
          className={task.status === TaskStatuses.Completed ? 'is-done' : ''}
          style={{ overflowWrap: 'anywhere', textAlign: 'start', width: '180px' }}
        >
          {task.title}
        </span>
        <Stack direction="row" spacing={1}>
          {task.description && (
            <Chip
              label="Desc"
              size="small"
              color="primary"
              style={{ cursor: 'pointer' }}
            />
          )}
          {(task.priority || task.priority === 0) && (
            <Chip
              label={priorityUtils(task.priority)}
              size="small"
              color={colorUtils(task.priority)}
              style={{ cursor: 'pointer' }}
            />
          )}
        </Stack>
      </Box>
      <ListItemSecondaryAction>
        <IconButton onClick={removeTaskHandler} size="small">
          <DeleteOutlineIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});
