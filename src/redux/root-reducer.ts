import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer, { IUserState } from './user/user.reducer';
import cartReducer, {
  ICartState,
  ICartReducerActions,
} from './cart/cart.reducer';
import { ISetCurrentUser } from './user/user.actions';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

export interface IRootReducer {
  user: IUserState;
  cart: ICartState;
}

export type IRootActions = ISetCurrentUser | ICartReducerActions;

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default persistReducer<IRootReducer, any>(persistConfig, rootReducer);
