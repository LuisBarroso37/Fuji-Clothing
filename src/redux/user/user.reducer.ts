import { ISetCurrentUser } from './user.actions';
import { SET_CURRENT_USER } from './user.constants';

export type IUser = object | null;

export interface IUserState {
  currentUser: IUser;
}

export const INITIAL_STATE: IUserState = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action: ISetCurrentUser) => {
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
