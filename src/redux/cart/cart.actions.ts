import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
} from './cart.constants';
import { Item } from '../../pages/shop/Shop';

export interface IToggleCartHidden {
  type: typeof TOGGLE_CART_HIDDEN;
}

export interface ICartItem {
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

export const clearItemFromCart = (item: Item) => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const removeItem = (item: Item) => ({
  type: REMOVE_ITEM,
  payload: item,
});