import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectHeaderDomain = state => state.get('header', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectHeader = () => createSelector(selectHeaderDomain, substate => substate.toJS());

const makeSelectCurrentSession = () =>
  createSelector(selectHeaderDomain, substate => substate.get('currentSession'),
  );
	
export default makeSelectHeader;
export { selectHeaderDomain, makeSelectCurrentSession };
