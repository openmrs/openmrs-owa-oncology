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
const makeSelectOrders = () =>
  createSelector(selectOrderPageDomain, substate =>
    substate.get('orders').toJS()
  );
  
export { makeSelectOrders };
