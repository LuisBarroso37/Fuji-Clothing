import { Reducer } from 'redux';

import {
  FECTH_COLLECTIONS_PENDING,
  FECTH_COLLECTIONS_SUCCESS,
  FECTH_COLLECTIONS_FAILURE,
} from './shop.constants';
import { ICollectionsMap } from './shop.actions';

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export interface ICollection {
  id: string;
  title: string;
  routeName?: string;
  items: Array<Item>;
}

export interface IShopState {
  collections: {
    [key: string]: ICollection;
  } | null;
  isFetching: boolean;
  errorMessage: string | undefined;
}

export interface IShopUpdateAction {
  type: string;
  payload: ICollectionsMap;
}

export interface IShopFetchFailure {
  type: string;
  payload: string;
}

type IShopActions = IShopUpdateAction & IShopFetchFailure;

const INITIAL_STATE: IShopState = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer: Reducer<IShopState, IShopActions> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case FECTH_COLLECTIONS_PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case FECTH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    case FECTH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
