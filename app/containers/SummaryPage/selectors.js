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
const makeSelectRegimenList = () =>
  createSelector(selectOrderPageDomain, substate =>
    substate.get('regimenList'),
  );

const makeSelectOrder = () =>
  createSelector(makeSelectRegimenList(), () => {

    const preMeds = [];
    preMeds.push({uuid: '123', name: 'pre-Asprin', adminInstructions: 'once daily'})
    preMeds.push({uuid: '345', name: 'pre-Fruitcake', adminInstructions: '2  x daily'})
    preMeds.push({uuid: '456', name: 'pre-Cupcake', adminInstructions: '3 x daily'})
    preMeds.push({uuid: '567', name: 'pre-Eclair filling', adminInstructions: 'IV push over 15 mipre-ns'})

    const chemoMeds = [];
    chemoMeds.push({uuid: '321', name: 'chemo-Chemo-Asprin', adminInstructions: 'once daily'})
    chemoMeds.push({uuid: '432', name: 'chemo-Fruitcake', adminInstructions: '2  x daily'})
    chemoMeds.push({uuid: '543', name: 'chemo-Cupcake', adminInstructions: '3 x daily'})
    chemoMeds.push({uuid: '654', name: 'chemo-Eclair filling', adminInstructions: 'IV push over 15 mins'})

    const postMeds = [];
    postMeds.push({uuid: '678', name: 'post-Asprin', adminInstructions: 'once daily'})
    postMeds.push({uuid: '789', name: 'post-Fruitcake', adminInstructions: '2  x daily'})
    postMeds.push({uuid: '890', name: 'post-Cupcake', adminInstructions: '3 x daily'})
    postMeds.push({uuid: '098', name: 'post-Eclair filling', adminInstructions: 'IV push over 15 mins'})

    return {'preMeds': preMeds, 'chemoMeds': chemoMeds, 'postMeds': postMeds};
  }
  );


export { makeSelectOrder };
