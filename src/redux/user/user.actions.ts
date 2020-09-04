import { IUser } from './user.reducer';
import { SET_CURRENT_USER } from './user.constants';

export interface ISetCurrentUser {
  type: string;
  payload: IUser;
}

export const setCurrentUser = (user: IUser) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
