import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the summaryPage state domain
 */

const selectOrderPageDomain = state => state.get('orderPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SummaryPage
 */

const makeSelectOrder = () =>
  createSelector(selectOrderPageDomain, substate =>
    substate.get('order'),
  );

// const makeSelectSummaryPage = () =>
//   createSelector(selectSummaryPageDomain, substate => substate.toJS());

export { makeSelectOrder };
