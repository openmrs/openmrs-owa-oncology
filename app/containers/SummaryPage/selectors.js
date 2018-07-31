import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderPage state domain
 */

const selectOrderPageDomain = state => state.get('summaryPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderPage
 */

const makeSelectEncounter = () =>
  createSelector(selectOrderPageDomain, substate =>
    substate.get('encounter'),
  );

export {
  makeSelectEncounter,
};
