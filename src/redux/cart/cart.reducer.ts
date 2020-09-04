import { TOGGLE_CART_HIDDEN } from './cart.constants';
import { ADD_ITEM } from './cart.constants';
import { IToggleCartHidden, IAddItem } from './cart.actions';
import { Item } from '../../pages/shop/Shop';
import { addItemToCart } from './cart.utils';

export interface ICartState {
  hidden: boolean;
  cartItems: Array<Item>
}

const INITIAL_STATE: ICartState = {
  hidden: true,
  cartItems: []
};

type ICartReducerActions = IToggleCartHidden & IAddItem;

const cartReducer = (state = INITIAL_STATE, action: ICartReducerActions) => {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
