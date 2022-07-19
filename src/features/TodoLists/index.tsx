import {asyncActions as todoListsAsyncActions, slice} from './todolists-reducer'
import {asyncActions as tasksActions} from './TodoList/Task/tasks-reducer'
import {TodoListsContainer} from './TodoListsContainer'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}

export {
    todoListsActions,
    tasksActions,
    TodoListsContainer,
}