import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './Collection-preview.scss';

import { ICollection } from '../../redux/shop/shop.reducer';
import CollectionItem from '../collection-item/Collection-item';

type ICollectionPreviewProps = RouteComponentProps & ICollection;

const CollectionPreview: React.FC<ICollectionPreviewProps> = ({
  title,
  items,
  history,
  match,
  routeName,
}) => (
  <div className='collection-preview'>
    <h1
      className='title'
      onClick={() => history.push(`${match.path}/${routeName}`)}
    >
      {title.toUpperCase()}
    </h1>
    <div className='preview'>
      {items
        .filter((item, i) => i < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default withRouter(CollectionPreview);
