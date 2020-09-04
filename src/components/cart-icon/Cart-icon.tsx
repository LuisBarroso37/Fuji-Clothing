import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './Cart-icon.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { IToggleCartHidden } from '../../redux/cart/cart.actions';

type ICartIconProps = ReturnType<typeof mapDispatchToProps>;

const CartIcon: React.FC<ICartIconProps> = ({ toggleCartHidden }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>0</span>
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch<IToggleCartHidden>) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
