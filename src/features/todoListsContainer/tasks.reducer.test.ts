import { v1 } from 'uuid';

import { tasksThunks as taskAsyncActions, slice, TasksStateType } from './tasks.reducer';
import { todoListsThunks } from './todoLists.reducer';

import { TaskPriorities, TaskStatuses, TaskType, TodoListType } from 'api/types';

const todoListID1 = v1();
const todoListID2 = v1();
let startState: TasksStateType;

const tasksReducer = slice.reducer;
const { fetchTasks, removeTask, addTask, updateTask } = taskAsyncActions;
const { addTodoList, fetchTodoLists, removeTodoList } = todoListsThunks;

beforeEach(() => {
  startState = {
    [todoListID1]: [
      {
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID1,
      },
      {
        id: '2',
        title: 'CSS',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID1,
      },
      {
        id: '3',
        title: 'JS',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID1,
      },
    ],
    [todoListID2]: [
      {
        id: '4',
        title: 'MILK',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID2,
      },
      {
        id: '5',
        title: 'BREAD',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID2,
      },
      {
        id: '6',
        title: 'BEER',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID2,
      },
    ],
  };
});

test('task should be deleted', () => {
  const params = { todoId: todoListID1, taskId: '1' };
  const action = removeTask.fulfilled(params, 'requestId', params);

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    [todoListID1]: [
      {
        id: '2',
        title: 'CSS',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID1,
      },
      {
        id: '3',
        title: 'JS',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID1,
      },
    ],
    [todoListID2]: [
      {
        id: '4',
        title: 'MILK',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID2,
      },
      {
        id: '5',
        title: 'BREAD',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID2,
      },
      {
        id: '6',
        title: 'BEER',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todoListID2,
      },
    ],
  });
});

test('correct task should be added', () => {
  const newTask: TaskType = {
    id: '123123',
    title: 'ReactJS',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: TaskPriorities.Low,
    startDate: '',
    todoListId: todoListID1,
  };
  const action = addTask.fulfilled(newTask, 'requestId', {
    todoId: newTask.todoListId,
    title: newTask.title,
  });

  const endState = tasksReducer(startState, action);

  expect(endState[todoListID1].length).toBe(4);
  expect(endState[todoListID1][0].id).toBeDefined();
  expect(endState[todoListID1][0].title).toBe('ReactJS');
  expect(endState[todoListID1][0].status).toBe(TaskStatuses.New);
});

test('correct task should change status', () => {
  const updateModel = {
    todoId: todoListID1,
    taskId: '1',
    model: { status: TaskStatuses.New },
  };
  const action = updateTask.fulfilled(updateModel, 'requestId', updateModel);

  const endState = tasksReducer(startState, action);

  expect(endState[todoListID1][0].status).toBe(TaskStatuses.New);
});

test('correct task should change title', () => {
  const updateModel = { todoId: todoListID1, taskId: '1', model: { title: 'ReactJS' } };
  const action = updateTask.fulfilled(updateModel, 'requestId', updateModel);

  const endState = tasksReducer(startState, action);

  expect(endState[todoListID1][0].title).toBe('ReactJS');
});

test('new array should be added when new todolist is added', () => {
  const todoList: TodoListType = {
    id: '111-111',
    addedDate: '',
    order: 1,
    title: 'What to read',
  };

  const action = addTodoList.fulfilled(todoList, 'requestId', todoList.title);

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(3);
  expect(endState[action.payload.id]).toEqual([]);
});

test('property with todolist should be deleted', () => {
  const action = removeTodoList.fulfilled(todoListID2, 'requestId', todoListID2);

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todoListID2]).not.toBeDefined();
});
test('correct tasks should be initialization during set todolists', () => {
  const action = fetchTodoLists.fulfilled(
    [{ id: 'todolistId1', addedDate: '', order: 0, title: 'What to learn' }],
    'requestId',
  );

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState.todolistId1).toStrictEqual([]);
});

test('correct tasks should be added for todolist', () => {
  const tasks = [
    {
      id: '1',
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListID1,
    },
    {
      id: '2',
      title: 'CSS',
      status: TaskStatuses.Completed,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todoListID1,
    },
  ];
  const action = fetchTasks.fulfilled(
    { todoId: 'todolistId1', tasks },
    'requestId',
    'todolistId1',
  );

  const endState = tasksReducer({ todolistId1: [] }, action);

  const keys = Object.keys(endState.todolistId1);

  expect(keys.length).toBe(2);
  expect(endState.todolistId1[0].id).toBe('1');
  expect(endState.todolistId1[1].id).toBe('2');
});
