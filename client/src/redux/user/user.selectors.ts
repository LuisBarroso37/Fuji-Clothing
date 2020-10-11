import { createSelector } from 'reselect';

import { IRootReducer } from '../../redux/root-reducer';

const selectUser = (state: IRootReducer) => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);