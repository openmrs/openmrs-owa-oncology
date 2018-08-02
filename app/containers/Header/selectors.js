import { createSelector } from 'reselect';
import initialState from './reducers/initialState';

/**
 * Direct selector to the header state domain
 */

const selectCurrentSessionDomain = state => state.get('currentSession', initialState);

const selectHeaderDomain = state => state.get('header', initialState);

const selectSettingDefaultEncounterTypeReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.settingEncounterTypeReducer)

const selectSettingDefaultEncounterRoleReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.settingEncounterRoleReducer)

const selectEncounterReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.encounterReducer)

const selectEncounterTypeReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.encounterTypeReducer)

const selectEncounterRoleReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.encounterRoleReducer)

const selectSessionReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.sessionReducer)

const selectPatientReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.patientReducer)

const selectOrderGroupReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.orderGroupReducer)

const selectObservationReducer = () =>
  createSelector(selectHeaderDomain, substate => substate.observationReducer)

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectCurrentSession = () =>
  selectCurrentSessionDomain;

const makeSelectDefaultEncounterType = () =>
  createSelector(selectSettingDefaultEncounterTypeReducer(), substate =>
    substate.getIn(['settingEncounterType']).results[0].value
  );

const makeSelectEncounters = () =>
  createSelector(selectEncounterReducer(), substate =>
    substate.get('encounters')
  );

const makeSelectDefaultEncounterRole = () =>
  createSelector(selectSettingDefaultEncounterRoleReducer(), substate =>
    substate.get('settingEncounterRole').results[0].value
  );

const makeSelectEncounterType = () =>
  createSelector(selectEncounterTypeReducer(), substate =>
    substate.get('encounterType')
  );

const makeSelectEncounterRole = () =>
  createSelector(selectEncounterRoleReducer(), substate =>
    substate.get('encounterRole')
  );

const makeSelectCurrentProvider = () =>
  createSelector(selectSessionReducer(), substate =>
    substate.get('currentProvider')
  );

const makeSelectEncounterLocation = () =>
  createSelector(selectSessionReducer(), substate =>
    substate.get('currentLocation')
  );

const makeSelectPatient = () =>
  createSelector(selectPatientReducer(), substate =>
    substate.get('patient').toJS(),
  );

const makeSelectOrderGroups = () =>
  createSelector(selectOrderGroupReducer(), substate =>
    substate.get('orderGroups').toJS(),
  );

const makeSelectObservations = () =>
  createSelector(selectObservationReducer(), substate =>
    substate.get('observations').toJS(),
  );

const makeSelectParentOrderGroups = () =>
  createSelector(makeSelectOrderGroups(), orderGroups =>
    (orderGroups.results || []).filter(orderGroup =>
      orderGroup.nestedOrderGroups && orderGroup.nestedOrderGroups.length > 0
    ).map(orderGroup => ({
      ...orderGroup,
      nestedOrderGroups: orderGroup.nestedOrderGroups.map(subOrderGroup => ({
        ...subOrderGroup,
        orders: subOrderGroup.orders.map(order => ({
          ...order,
          dosingInstructions: JSON.parse(order.dosingInstructions),
        })),
      })),
    }))
  );

const makeSelectExtendedOrderGroups = () =>
  createSelector(selectOrderGroupReducer(), substate =>
    substate.get('extendedOrderGroups').toJS(),
  );

const makeSelectPatientRegimens = () =>
  createSelector(makeSelectExtendedOrderGroups(), orderGroups => {
    orderGroups.forEach(orderGroup => {
      if (orderGroup.previousOrderGroup) {
        const previousOrderGroup = orderGroups.find(oG =>
          oG.uuid === orderGroup.previousOrderGroup.uuid
        );
        previousOrderGroup.nextOrderGroup = orderGroup;
      }
    });

    return orderGroups
      .filter(orderGroup => !orderGroup.previousOrderGroup)
      .map(orderGroup => {
        const regimen = [orderGroup];
        let next = orderGroup.nextOrderGroup;
        while(next) {
          regimen.push(next);
          next = next.nextOrderGroup;
        }
        return regimen.reverse();
      });

  });

export default makeSelectCurrentSession;
export {
  makeSelectCurrentSession,
  makeSelectDefaultEncounterRole,
  makeSelectDefaultEncounterType,
  makeSelectEncounterRole,
  makeSelectCurrentProvider,
  makeSelectEncounterType,
  makeSelectEncounterLocation,
  makeSelectEncounters,
  makeSelectPatient,
  makeSelectOrderGroups,
  makeSelectParentOrderGroups,
  makeSelectObservations,
  makeSelectExtendedOrderGroups,
  makeSelectPatientRegimens,
};
