import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App demo={true}/>;

export const AppExample = Template.bind({});

AppExample.args = {};