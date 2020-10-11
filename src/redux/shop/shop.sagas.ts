import { takeLatest, call, put, all } from 'redux-saga/effects';

import { FECTH_COLLECTIONS_PENDING } from './shop.constants';
import {
  firestore,
  convertCollectionSnapshotToMap,
  IAccumulatorObject,
} from '../../firebase/firebase.utils';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = yield collectionRef.get();
    const collectionsMap: IAccumulatorObject = yield call(
      convertCollectionSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

function* fetchCollectionsStart() {
  yield takeLatest(FECTH_COLLECTIONS_PENDING, fetchCollectionsAsync);
}

function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}

export { fetchCollectionsStart, fetchCollectionsAsync, shopSagas };
