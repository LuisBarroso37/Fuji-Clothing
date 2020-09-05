import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './Checkout-item.scss';

import { ItemProp } from '../collection-item/Collection-item';
import {
  clearItemFromCart,
  ICartItem,
  removeItem,
  addItem,
} from '../../redux/cart/cart.actions';
import { Item } from '../../pages/shop/Shop';

type ICheckoutItemProps = ItemProp & ReturnType<typeof mapDispatchToProps>;

const CheckoutItem: React.FC<ICheckoutItemProps> = ({
  item,
  clearItemFromCart,
  removeItem,
  addItem,
}) => {
  const { imageUrl, name, quantity, price } = item;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='Clothing item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => removeItem(item)}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItem(item)}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItemFromCart(item)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ICartItem>) => ({
  clearItemFromCart: (item: Item) => dispatch(clearItemFromCart(item)),
  removeItem: (item: Item) => dispatch(removeItem(item)),
  addItem: (item: Item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
