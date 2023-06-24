export type TodoListType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type FieldsErrorsType = { field: string; error: string };

export type CommonResponseType<T = object> = {
  fieldsErrors: FieldsErrorsType[];
  resultCode: number;
  messages: string[];
  data: T;
};

export type TasksType = {
  error: null | string;
  items: TaskType[];
  totalCount: 0;
};

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export type TaskType = {
  addedDate: string;
  deadline: string;
  description: string;
  id: string;
  order: number;
  priority: TaskPriorities;
  startDate: string;
  status: TaskStatuses;
  title: string;
  todoListId: string;
};

export type UpdatedDomainTaskModel = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export type UserType = {
  id: number;
  email: string;
  login: string;
};
