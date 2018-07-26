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

const makeSelectRegimenList = () =>
  createSelector(selectOrderPageDomain, substate =>
    substate.get('regimenList'),
  );

const makeSelectOrders = () =>
  createSelector(selectOrderPageDomain, substate =>
    substate.get('orders').toJS(),
  );

const makeSelectPatient = () =>
  createSelector(selectOrderPageDomain, substate =>
    substate.get('patient'),
  );

const makeSelectMedications = () =>
  createSelector(makeSelectRegimenList(), regimenList =>
    (regimenList.results || []).map(regimen =>
      (regimen.orderSetMembers || []).map(order => {
        try {
          return JSON.parse(order.orderTemplate);
        } catch (e) {
          return null;
        }
      }),
    ),
  );

const makeSelectPremedications = () =>
  createSelector(makeSelectOrders(), orders =>
    orders.map(medications =>
      medications.filter(m => m && m.orderReason === 'Premedication')
    )
  );

const makeSelectChemotherapy = () =>
  createSelector(makeSelectOrders(), orders =>
    orders.map(medications =>
      medications.filter(m => m && m.orderReason === 'Chemotherapy')
    )
  );

const makeSelectPostmedications = () =>
  createSelector(makeSelectOrders(), orders =>
    orders.map(medications =>
      medications.filter(m => m && m.orderReason === 'Postmedication')
    )
  );

export {
  makeSelectRegimenList,
  makeSelectMedications,
  makeSelectPremedications,
  makeSelectChemotherapy,
  makeSelectPostmedications,
  makeSelectOrders,
  makeSelectPatient,
};
