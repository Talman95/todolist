import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Task } from './Task';

import { TaskPriorities, TaskStatuses, TaskType } from 'api/types';
import { ReduxStoreProviderDecorator } from 'stories/decorators/ReduxStoreProviderDecorator';

export default {
  title: 'TODOLIST/Task',
  component: Task,
  args: {
    removeTask: action('Remove button inside Task clicked'),
    changeTaskTitle: action('Title changed inside Task'),
    changeTaskStatus: action('Status changed inside Task'),
  },
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const task: TaskType = {
  addedDate: '',
  deadline: '',
  description: '',
  id: '',
  order: 1,
  priority: TaskPriorities.Low,
  startDate: '',
  status: TaskStatuses.New,
  title: '',
  todoListId: '',
};

const Template: ComponentStory<typeof Task> = () => {
  return <Task todoId="todolistId1" task={task} />;
};

export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {};
