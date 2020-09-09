import { Reducer } from 'redux';

import SHOP_DATA from './Shop.data';

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export interface ICollection {
  id: number;
  title: string;
  routeName?: string;
  items: Array<Item>;
}

export interface IShopState {
  collections: Array<ICollection>;
}

export interface IShopAction {
  type: string;
}

const INITIAL_STATE: IShopState = {
  collections: SHOP_DATA,
};

const shopReducer: Reducer<IShopState, IShopAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shopReducer;
