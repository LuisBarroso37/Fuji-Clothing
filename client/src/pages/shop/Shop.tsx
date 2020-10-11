import React, { useEffect } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CollectionsOverview from '../../components/collections-overview/Collections-overview';
import CollectionPage from '../collection/Collection';
import WithSpinner from '../../components/with-spinner/With-spinner';
import {
  fetchCollectionsPending,
  IFetchCollectionsPending,
} from '../../redux/shop/shop.actions';
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';
import { IRootReducer } from '../../redux/root-reducer';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

type IShopPageProps = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const ShopPage: React.FC<IShopPageProps> = ({ fetchCollectionsPending, match, isFetching, isCollectionLoaded }) => {
  useEffect(() => {
    fetchCollectionsPending();
  }, [fetchCollectionsPending]);

  return (
    <div>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={isFetching} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner
            isLoading={!isCollectionLoaded}
            {...props}
          />
        )}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<IFetchCollectionsPending>) => ({
  fetchCollectionsPending: () => dispatch(fetchCollectionsPending()),
});

const mapStateToProps = (state: IRootReducer) => ({
  isFetching: selectIsCollectionFetching(state),
  isCollectionLoaded: selectIsCollectionsLoaded(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
