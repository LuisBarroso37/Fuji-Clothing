import { IUser } from './user.reducer';
import userActionTypes from './user.constants';

export interface IGoogleSignInPending {
  type: typeof userActionTypes.GOOGLE_SIGN_IN_PENDING;
}

export const googleSignInPending = () => ({
  type: userActionTypes.GOOGLE_SIGN_IN_PENDING,
});

export interface ISignInSuccess {
  type: typeof userActionTypes.SIGN_IN_SUCCESS;
  payload: IUser;
}

export const signInSuccess = (user: IUser) => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export interface ISignInFailure {
  type: typeof userActionTypes.SIGN_IN_SUCCESS;
  payload: string;
}

export const signInFailure = (error: string) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export interface ISignInInfo {
  [key: string]: string;
}

export interface IEmailSignInPending {
  type: typeof userActionTypes.EMAIL_SIGN_IN_PENDING;
  payload: ISignInInfo;
}

export const emailSignInPending = (SignInInfo: ISignInInfo) => ({
  type: userActionTypes.EMAIL_SIGN_IN_PENDING,
  payload: SignInInfo,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

export const signOutPending = () => ({
  type: userActionTypes.SIGN_OUT_PENDING,
});

export const signOutSucess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error: string) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpPending = (userCredentials: ISignInInfo) => ({
  type: userActionTypes.SIGN_UP_PENDING,
  payload: userCredentials
});

export interface IUserCredentials {
  [key: string]: IUser | string
}

export interface ISignUpSuccess {
  type: typeof userActionTypes.SIGN_UP_SUCCESS,
  payload: IUserCredentials
}

export const signUpSuccess = ({ user, additionalData }: IUserCredentials) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData }
});

export const signUpFailure = (error: string) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
