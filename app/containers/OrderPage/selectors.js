import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderPage state domain
 */

const selectOrderPageDomain = state => state.get('orderPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderPage
 */

const makeSelectOrderPage = () =>
  createSelector(selectOrderPageDomain, substate => substate.toJS());

export default makeSelectOrderPage;
export { selectOrderPageDomain };
