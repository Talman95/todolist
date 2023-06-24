import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { App } from './App';

import {
  BrowserRouterDecorator,
  ReduxStoreProviderDecorator,
} from 'stories/decorators/ReduxStoreProviderDecorator';

export default {
  title: 'TODOLIST/App',
  component: App,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} as ComponentMeta<typeof App>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Template: ComponentStory<typeof App> = () => <App demo />;

export const AppExample = Template.bind({});

AppExample.args = {};
