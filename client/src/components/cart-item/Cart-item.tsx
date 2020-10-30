import React from 'react';

import './Cart-item.scss';

import { ItemProp } from '../collection-item/Collection-item';

const CartItem: React.FC<ItemProp> = ({ item }) => {
  const { imageUrl, price, name, quantity } = item;

  return (
    <div className='cart-item'>
      <img src={imageUrl} alt='Clothing item' />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
