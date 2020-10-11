import {
  FECTH_COLLECTIONS_PENDING,
  FECTH_COLLECTIONS_SUCCESS,
  FECTH_COLLECTIONS_FAILURE,
} from './shop.constants';
import { ICollection } from './shop.reducer';

export interface ICollectionsMap {
  [key: string]: ICollection;
}

export interface IFetchCollectionsPending {
  type: typeof FECTH_COLLECTIONS_PENDING;
}

export interface IFetchCollectionsSuccess {
  type: typeof FECTH_COLLECTIONS_SUCCESS;
  payload: ICollectionsMap;
}

export interface IFetchCollectionsFailure {
  type: typeof FECTH_COLLECTIONS_FAILURE;
  payload: ICollectionsMap;
}

export const fetchCollectionsPending = () => ({
  type: FECTH_COLLECTIONS_PENDING,
});

export const fetchCollectionsSuccess = (collectionsMap: ICollectionsMap) => ({
  type: FECTH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage: string) => ({
  type: FECTH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});
