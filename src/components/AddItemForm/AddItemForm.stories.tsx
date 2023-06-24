import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AddItemForm } from './AddItemForm';

export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: { description: 'Button inside form clicked' },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = args => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
  addItem: action('Button inside form clicked'),
};

export const AddItemFormDisabledExample = Template.bind({});

AddItemFormDisabledExample.args = {
  addItem: action('Button inside form clicked'),
  disabled: true,
};
