import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer, { IUserState } from './user/user.reducer';
import cartReducer, {
  ICartState,
  ICartReducerActions,
} from './cart/cart.reducer';
import directoryReducer, {
  IDirectoryState,
} from './directory/directory.reducer';
import shopReducer, { IShopState } from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

export interface IRootReducer {
  user: IUserState;
  cart: ICartState;
  directory: IDirectoryState;
  shop: IShopState;
}

export type IRootActions = ICartReducerActions;

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer<IRootReducer, any>(persistConfig, rootReducer);
