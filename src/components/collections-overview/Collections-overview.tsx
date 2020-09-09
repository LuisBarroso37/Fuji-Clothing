import React from 'react';
import { connect } from 'react-redux';

import './Collections-overview.scss';

import CollectionPreview from '../collection-preview/Collection-preview';
import { IRootReducer } from '../../redux/root-reducer';
import { selectShopCollections } from '../../redux/shop/shop.selectors';
import { IShopState } from '../../redux/shop/shop.reducer';

const CollectionsOverview: React.FC<IShopState> = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map((collection) => (
      <CollectionPreview
        key={collection.id}
        id={collection.id}
        title={collection.title}
        items={collection.items}
      />
    ))}
  </div>
);

const mapStateToProps = (state: IRootReducer) => ({
  collections: selectShopCollections(state),
});

export default connect(mapStateToProps)(CollectionsOverview);
