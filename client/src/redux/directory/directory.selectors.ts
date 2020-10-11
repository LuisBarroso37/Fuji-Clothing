import { createSelector } from 'reselect';

import { IRootReducer } from '../root-reducer';

const selectDirectory = (state: IRootReducer) => state.directory;

const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);

export { selectDirectorySections };
