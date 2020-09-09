import { createSelector } from 'reselect';

import { IRootReducer } from '../root-reducer';

import memoize from 'lodash.memoize';

const selectShop = (state: IRootReducer) => state.shop;

const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// Memoize the return of the function which is the selector
const selectCollection = memoize((collectionUrlParam: string) =>
  createSelector([selectShopCollections], (collections) =>
    collections.find(
      (collection) => collection.routeName === collectionUrlParam
    )
  )
);

export { selectShopCollections, selectCollection };
