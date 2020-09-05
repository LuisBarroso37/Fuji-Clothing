import { createSelector } from 'reselect';

import { IRootReducer } from '../../redux/root-reducer';

const selectCart = (state: IRootReducer) => state.cart;

const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

const selectCartHidden = createSelector([selectCart], (cart) => cart.hidden);

const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cartItem) => {
    let quantity = 0;

    if (cartItem.quantity) {
      quantity = cartItem.quantity;
    }

    return acc + quantity;
  }, 0)
);

const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cartItem) => {
    let quantity = 0;

    if (cartItem.quantity) {
      quantity = cartItem.quantity;
    }

    return acc + quantity * cartItem.price;
  }, 0)
);

export {
  selectCartItems,
  selectCartItemsCount,
  selectCartHidden,
  selectCartTotal,
};
