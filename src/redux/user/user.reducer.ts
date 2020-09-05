import { Reducer } from 'redux';

import { ISetCurrentUser } from './user.actions';
import { SET_CURRENT_USER } from './user.constants';

export type IUser = object | null;

export interface IUserState {
  currentUser: IUser;
}

export const INITIAL_STATE: IUserState = {
  currentUser: null,
};

const userReducer: Reducer<IUserState ,ISetCurrentUser> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
