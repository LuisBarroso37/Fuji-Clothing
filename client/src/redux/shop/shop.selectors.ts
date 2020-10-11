import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

import { IRootReducer } from '../root-reducer';

const selectShop = (state: IRootReducer) => state.shop;

const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// Memoize the return of the function which is the selector
const selectCollection = memoize((collectionUrlParam: string) =>
  createSelector([selectShopCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);

const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections // !! returns true or false
);

export {
  selectShopCollections,
  selectCollection,
  selectCollectionsForPreview,
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
};
