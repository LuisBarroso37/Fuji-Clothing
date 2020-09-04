import { combineReducers } from 'redux';

import userReducer, { IUserState } from './user/user.reducer';
import cartReducer, { ICartState } from './cart/cart.reducer';

export interface IRootReducer {
  user: IUserState;
  cart: ICartState;
}

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
