import { TOGGLE_CART_HIDDEN } from './cart.constants';
import { ADD_ITEM } from './cart.constants';
import { Item } from '../../pages/shop/Shop';

export interface IToggleCartHidden {
  type: typeof TOGGLE_CART_HIDDEN;
}

export interface IAddItem {
  type: typeof ADD_ITEM;
  payload: Item;
}

export const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN,
});

export const addItem = (item: Item) => ({
  type: ADD_ITEM,
  payload: item,
});
