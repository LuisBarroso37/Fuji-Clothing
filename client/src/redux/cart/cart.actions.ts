import cartActionTypes from './cart.constants';
import { Item } from '../../redux/shop/shop.reducer';

export interface IToggleCartHidden {
  type: typeof cartActionTypes.TOGGLE_CART_HIDDEN;
}

export interface ICartItem {
  type: typeof cartActionTypes.ADD_ITEM;
  payload: Item;
}

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item: Item) => ({
  type: cartActionTypes.ADD_ITEM,
  payload: item,
});

export const clearItemFromCart = (item: Item) => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const removeItem = (item: Item) => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: cartActionTypes.CLEAR_CART
});