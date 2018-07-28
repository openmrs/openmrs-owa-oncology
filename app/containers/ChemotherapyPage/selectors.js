import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chemotherapyPage state domain
 */

const selectChemotherapyPageDomain = state => state.get('chemotherapyPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChemotherapyPage
 */

const makeSelectChemotherapyPage = () =>
  createSelector(selectChemotherapyPageDomain, substate => substate.toJS());

export default makeSelectChemotherapyPage;
export { selectChemotherapyPageDomain };
