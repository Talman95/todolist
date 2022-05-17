import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../store/ReduxStoreProviderDecorator";


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

const Template: ComponentStory<typeof Task> = (args) => {
    return <Task todoListID={'todolistId1'} taskID={'111'}/>
}

export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {};