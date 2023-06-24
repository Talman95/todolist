import { instance } from './instance';
import { CommonResponseType, LoginParamsType, UserType } from './types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<CommonResponseType<{ userId: number }>>('/auth/login', data);
  },
  authMe() {
    return instance.get<CommonResponseType<UserType>>('auth/me');
  },
  logout() {
    return instance.delete<CommonResponseType>('/auth/login');
  },
};
