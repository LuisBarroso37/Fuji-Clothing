import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';

import './Cart-dropdown.scss';

import CustomButton from '../custom-button/Custom-button';
import CartItem from '../cart-item/Cart-item';
import { IRootReducer } from '../../redux/root-reducer';
import { Item } from '../../pages/shop/Shop';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import {
  toggleCartHidden,
  IToggleCartHidden,
} from '../../redux/cart/cart.actions';

interface ICartItems extends RouteComponentProps {
  cartItems: Array<Item>;
}

type ICartDropdownProps = ICartItems &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const CartDropdown: React.FC<ICartDropdownProps> = ({
  cartItems,
  history,
  toggleCartHidden,
}) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        toggleCartHidden();
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = (state: IRootReducer) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IToggleCartHidden>) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
