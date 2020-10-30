import React, { useEffect, lazy, Suspense } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Spinner from '../../components/spinner/Spinner';
import {
  fetchCollectionsPending,
  IFetchCollectionsPending,
} from '../../redux/shop/shop.actions';
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';
import { IRootReducer } from '../../redux/root-reducer';

const CollectionsOverview = lazy(
  () => import('../../components/collections-overview/Collections-overview')
);
const CollectionPage = lazy(() => import('../collection/Collection'));

type IShopPageProps = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const ShopPage: React.FC<IShopPageProps> = ({
  fetchCollectionsPending,
  match,
}) => {
  useEffect(() => {
    fetchCollectionsPending();
  }, [fetchCollectionsPending]);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IFetchCollectionsPending>) => ({
  fetchCollectionsPending: () => dispatch(fetchCollectionsPending()),
});

const mapStateToProps = (state: IRootReducer) => ({
  isFetching: selectIsCollectionFetching(state),
  isCollectionLoaded: selectIsCollectionsLoaded(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
