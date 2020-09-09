import { Reducer } from 'redux';

import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
} from './cart.constants';
import { IToggleCartHidden, ICartItem } from './cart.actions';
import { Item } from '../../redux/shop/shop.reducer';
import { addItemToCart, removeItemFromCart } from './cart.utils';

export interface ICartState {
  hidden: boolean;
  cartItems: Array<Item>;
}

const INITIAL_STATE: ICartState = {
  hidden: true,
  cartItems: [],
};

export type ICartReducerActions = IToggleCartHidden & ICartItem;

const cartReducer: Reducer<ICartState, ICartReducerActions> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload) || [],
      };
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ) || [],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload) || [],
      };
    default:
      return state;
  }
};

export default cartReducer;
