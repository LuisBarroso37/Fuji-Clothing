import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

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
import { IShopState } from '../../redux/shop/shop.reducer';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

type IShopPageProps = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

class ShopPage extends React.Component<IShopPageProps, {}> {
  componentDidMount() {
    const { fetchCollectionsPending } = this.props;
    fetchCollectionsPending();
  }

  render() {
    const { match, isFetching, isCollectionLoaded } = this.props;
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
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IShopState, void, IFetchCollectionsPending>
) => ({
  fetchCollectionsPending: () => dispatch(fetchCollectionsPending()),
});

const mapStateToProps = (state: IRootReducer) => ({
  isFetching: selectIsCollectionFetching(state),
  isCollectionLoaded: selectIsCollectionsLoaded(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
