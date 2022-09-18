import {asyncActions as todoListsAsyncActions, slice as todosSlice} from './todolists-reducer'
import {asyncActions as tasksAsyncActions, slice as tasksSlice} from './TodoList/Task/tasks-reducer'
import {TodoListsContainer} from './TodoListsContainer'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...todosSlice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions,
}

const todoListsReducer = todosSlice.reducer
const tasksReducer = tasksSlice.reducer

export {
    todoListsActions,
    todoListsReducer,
    tasksActions,
    tasksReducer,
    TodoListsContainer,
}