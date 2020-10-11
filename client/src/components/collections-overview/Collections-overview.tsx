import React from 'react';
import { connect } from 'react-redux';

import './Collections-overview.scss';

import CollectionPreview from '../collection-preview/Collection-preview';
import { IRootReducer } from '../../redux/root-reducer';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import { ICollection } from '../../redux/shop/shop.reducer';

type ICollectionsOverviewProps = ReturnType<typeof mapStateToProps>;

const CollectionsOverview: React.FC<ICollectionsOverviewProps> = ({
  collections,
}) => (
  <div className='collections-overview'>
    {collections.map((collection: ICollection) => (
      <CollectionPreview
        key={collection.id}
        id={collection.id}
        title={collection.title}
        items={collection.items}
        routeName={collection.routeName}
      />
    ))}
  </div>
);

const mapStateToProps = (state: IRootReducer) => ({
  collections: selectCollectionsForPreview(state),
});

export default connect(mapStateToProps)(CollectionsOverview);
