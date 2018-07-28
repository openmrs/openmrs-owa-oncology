// import { createSelector } from 'reselect';
import initialState from './reducers/initialState';

/**
 * Direct selector to the header state domain
 */

const selectCurrentSessionDomain = state => state.get('currentSession', initialState);
const selectDefaultSettingEncounterTypeDomain = state => state.get('defaultSettingEncounterType', initialState);
const selectDefaultSettingEncounterRoleDomain = state => state.get('defaultSettingEncounterRole', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectCurrentSession = () =>
  selectCurrentSessionDomain;

const makeSelectDefaultEncounterRole = () =>
  selectDefaultSettingEncounterTypeDomain;

const makeSelectDefaultEncounterType = () =>
  selectDefaultSettingEncounterRoleDomain;
	
export default makeSelectCurrentSession;
export { makeSelectCurrentSession, makeSelectDefaultEncounterRole, makeSelectDefaultEncounterType };
