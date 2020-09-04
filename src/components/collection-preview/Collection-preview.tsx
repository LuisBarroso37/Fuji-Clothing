import React from 'react';

import './Collection-preview.scss';

import { ICollection } from '../../pages/shop/Shop';
import CollectionItem from '../collection-item/Collection-item';

const CollectionPreview: React.FC<ICollection> = ({ title, items }) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {items
        .filter((item, i) => i < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
