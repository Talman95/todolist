import { instance } from './instance';
import {
  CommonResponseType,
  TasksType,
  TaskType,
  TodoListType,
  UpdatedDomainTaskModel,
} from './types';

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodoListType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<CommonResponseType<{ item: TodoListType }>>('todo-lists', {
      title,
    });
  },
  deleteTodolist(todoListID: string) {
    return instance.delete<CommonResponseType>(`todo-lists/${todoListID}`);
  },
  updateTodolist(todoListID: string, title: string) {
    return instance.put<CommonResponseType>(`todo-lists/${todoListID}`, { title });
  },
  getTasks(todoListID: string) {
    return instance.get<TasksType>(`todo-lists/${todoListID}/tasks`);
  },
  createTask(todoListID: string, title: string) {
    return instance.post<CommonResponseType<{ item: TaskType }>>(
      `todo-lists/${todoListID}/tasks`,
      { title },
    );
  },
  deleteTask(todoListID: string, taskID: string) {
    return instance.delete<CommonResponseType>(
      `/todo-lists/${todoListID}/tasks/${taskID}`,
    );
  },
  updateTask(todoListID: string, taskID: string, newTask: UpdatedDomainTaskModel) {
    return instance.put<CommonResponseType<{ item: TaskType }>>(
      `/todo-lists/${todoListID}/tasks/${taskID}`,
      { ...newTask },
    );
  },
};
