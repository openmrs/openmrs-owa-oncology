import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the summaryPage state domain
 */

const selectSummaryPageDomain = state => state.get('summaryPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SummaryPage
 */

const makeSelectSummaryPage = () =>
  createSelector(selectSummaryPageDomain, substate => substate.toJS());

export default makeSelectSummaryPage;
export { selectSummaryPageDomain };
