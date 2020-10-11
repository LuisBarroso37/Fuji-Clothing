import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.constants';
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';
import {
  signInSuccess,
  signInFailure,
  signOutSucess,
  signOutFailure,
  IEmailSignInPending,
  signUpSuccess,
  signUpFailure,
  ISignUpSuccess,
} from './user.actions';

function* getSnapshotFromUserAuth(userAuth: any, additionalData?: any) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_PENDING, signInWithGoogle);
}

function* signInWithEmail(action: IEmailSignInPending) {
  const { email, password } = action.payload;
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_PENDING, signInWithEmail);
}

function* isUserAuthenticated() {
  try {
    const userAuth = getCurrentUser();

    if (!userAuth) return;

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSucess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_PENDING, signOut);
}

function* signUp(action: IEmailSignInPending) {
  const { displayName, email, password } = action.payload;
  
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );

    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch(error) {
    yield put(signUpFailure(error.message));
  }
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_PENDING, signUp);
}

function* signInAfterSignUp(action: ISignUpSuccess) {
  const { user, additionalData } = action.payload;
  try {
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch(error) {
    yield put(signInFailure(error.message));
  }
}

function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}

export {
  onGoogleSignInStart,
  signInWithGoogle,
  onEmailSignInStart,
  signInWithEmail,
  onCheckUserSession,
  isUserAuthenticated,
  onSignOutStart,
  signOut,
  onSignUpStart,
  signUp,
  onSignUpSuccess,
  signInAfterSignUp,
  userSagas,
};
