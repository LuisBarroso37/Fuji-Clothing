import React from 'react';
import { connect } from 'react-redux';

import './Checkout.scss';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';
import { IRootReducer } from '../../redux/root-reducer';
import CheckoutItem from '../../components/checkout-item/Checkout-item';

type ICheckoutPageProps = ReturnType<typeof mapStateToProps>;

const CheckoutPage: React.FC<ICheckoutPageProps> = ({ cartItems, total }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} item={cartItem} />
    ))}
    <div className='total'>
      <span>TOTAL: ${total}</span>
    </div>
  </div>
);

const mapStateToProps = (state: IRootReducer) => ({
  cartItems: selectCartItems(state),
  total: selectCartTotal(state),
});

export default connect(mapStateToProps)(CheckoutPage);
