// типы для цвета кнопки
import { FieldsErrorsType } from 'api/types';

export type ThunkErrorType = {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldsErrorsType> };
};

export type ColorType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';
