import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './Cart-icon.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden, IToggleCartHidden } from '../../redux/cart/cart.actions';
import { IRootReducer } from '../../redux/root-reducer';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

type ICartIconProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const CartIcon: React.FC<ICartIconProps> = ({
    toggleCartHidden,
    itemCount,
  }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = (dispatch: Dispatch<IToggleCartHidden>) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state: IRootReducer) => {
  return {
    itemCount: selectCartItemsCount(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
