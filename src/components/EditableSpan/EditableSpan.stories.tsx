import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EditableSpan } from './EditableSpan';

export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  argTypes: {
    title: {
      defaultValue: 'HTML',
      description: 'Start value of EditableSpan',
    },
    changeTitle: {
      description: 'Value EditableSpan changed',
    },
  },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = args => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
  changeTitle: action('Value EditableSpan changed'),
};

export const DisabledSpanExample = Template.bind({});

DisabledSpanExample.args = {
  changeTitle: action('Value EditableSpan changed'),
  disabled: true,
};
