import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './Collection-item.scss';

import { Item } from '../../redux/shop/shop.reducer';
import CustomButton from '../custom-button/Custom-button';
import { addItem, ICartItem } from '../../redux/cart/cart.actions';

export interface ItemProp {
  item: Item;
}

type ICollectionItemProps = ItemProp & ReturnType<typeof mapDispatchToProps>;

const CollectionItem: React.FC<ICollectionItemProps> = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-item-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ICartItem>) => ({
  addItem: (item: Item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
