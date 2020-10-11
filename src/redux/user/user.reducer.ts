import { Reducer } from 'redux';

import { ISignInFailure, ISignInSuccess } from './user.actions';
import userActionTypes from './user.constants';

export type IUser = object | null;

export interface IUserState {
  currentUser: IUser;
  error?: object | null;
}

export const INITIAL_STATE: IUserState = {
  currentUser: null,
  error: null,
};

type IUserActions = ISignInSuccess & ISignInFailure;

const userReducer: Reducer<IUserState, IUserActions> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_OUT_FAILURE:
      case userActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
