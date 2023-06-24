import { TaskPriorities } from 'api/types';

export const priorityUtils = (priority: TaskPriorities) => {
  let result = '';

  switch (priority) {
    case 0:
      result = 'Low';
      break;
    case 1:
      result = 'Middle';
      break;
    case 2:
      result = 'High';
      break;
    case 3:
      result = 'Urgently';
      break;
    case 4:
      result = 'Later';
      break;
    default:
      result = 'Middle';
  }

  return result;
};
