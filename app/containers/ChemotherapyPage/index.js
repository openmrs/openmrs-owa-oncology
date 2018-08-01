/**
 *
 * ChemotherapyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Typography from '@material-ui/core/Typography';

import NaviList from 'components/NaviList';
import { Sidebar, Content } from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getParam } from 'utils/helpers';
import { createObservation } from './actions';
import { createEncounterAction } from '../Header/actions';

import Main from './components/Main';
import AdministrateForm from './components/AdministrateForm';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectEncounters,
  makeSelectEncounterRole,
  makeSelectExtendedOrderGroups,
} from '../Header/selectors';

import {
  ENC_CHEMO_SESSION,
  OG_SINGLE_CYCLE_STATUS,
  OG_SCL_COMPLETE,
  ADMIN_DOSE,
  NOTES,
  ML,
  MG,
  QUANTITY_OF_MEDICATION,
  DOSING_UNIT_QUESTION,
} from '../../conceptMapping.json';

const SidebarTitle = styled.div`
  padding: 1em 1em 0.5em;
`;

/* eslint-disable react/prefer-stateless-function */
export class ChemotherapyPage extends React.Component {

  getEncounterStatus() {
    // const observation = encounter.obs.map(enc)
  }

  getCurrentOrderGroup(orderGroups , uuid) {
    return orderGroups.find(orderGroup => orderGroup.uuid === uuid);
  }

  handleAdministrateFormSubmit = (data) => {
    const patientUuid = getParam('patientId');
    console.log('SUBMIT');
    const encounter = {
      encounterType: ENC_CHEMO_SESSION,
      patient: patientUuid,
      obs: [
        ...Object.keys(data.orders).map(uuid => ({
          order: uuid,
          display: "Administered dose",
          concept: ADMIN_DOSE,
          person: "bf6abba0-b581-44a8-b188-ae4624801000",
          groupMembers: [
            {
              concept: DOSING_UNIT_QUESTION,
              value: ML,
            },
            {
              concept: QUANTITY_OF_MEDICATION,
              value: data.orders[uuid].ml,
            },
          ],
        })),
        ...Object.keys(data.orders).map(uuid => ({
          order: uuid,
          display: "Administered dose",
          concept: ADMIN_DOSE,
          person: "bf6abba0-b581-44a8-b188-ae4624801000",
          groupMembers: [
            {
              concept: DOSING_UNIT_QUESTION,
              value: MG,
            },
            {
              concept: QUANTITY_OF_MEDICATION,
              value: data.orders[uuid].mg,
            },
          ],
        })),
        {
          // Physician Notes
          "display": "Clinical Impressions Notes",
          "concept": NOTES,
          "value": data.notes,
        },
        {
          // Cycle Status
          "display": "Single Cycle Status",
          "concept": OG_SINGLE_CYCLE_STATUS,
          "value": OG_SCL_COMPLETE,
        },
      ],
    };

    this.props.createEncounter(encounter);
  }

  render() {
    const { orderGroups, match } = this.props;
    const { cycleUuid } = match.params;
    const selectedOrderGroup = this.getCurrentOrderGroup(orderGroups, cycleUuid);

    return (
      <div>
        <Helmet>
          <title>ChemotherapyPage</title>
          <meta name="description" content="Description of ChemotherapyPage" />
        </Helmet>
        <Sidebar>
          <SidebarTitle>
            <Typography variant="title">
              <FormattedMessage {...messages.header} />
            </Typography>
          </SidebarTitle>
          {orderGroups.length > 0 &&
            <NaviList
              selectedItem={cycleUuid}
              items={orderGroups.map(orderGroup => ({
                id: orderGroup.uuid,
                title: orderGroup.orderSet.display,
                status: 'completed',
                children: [{
                  id: orderGroup.uuid,
                  cycle: 1,
                  title: 'Cycle 1 of 6',
                  date: '08/01/18',
                  status: 'completed',
                }],
              }))}
            />
          }
        </Sidebar>
        <Content>
          <Switch>
            <Route
              exact
              path="/chemotherapy/:cycleUuid?"
              render={props =>
                <Main {...props} orderGroup={selectedOrderGroup} />
              }
            />
            <Route
              exact
              path="/chemotherapy/:cycleUuid/administrate"
              render={props =>
                orderGroups.length > 0 &&
                  <AdministrateForm
                    {...props}
                    orderGroup={selectedOrderGroup}
                    onFormSubmit={this.handleAdministrateFormSubmit}
                  />
              }
            />
          </Switch>
        </Content>
      </div>
    );
  }
}

ChemotherapyPage.propTypes = {
  encounters: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  createObservation: PropTypes.func.isRequired,
  createEncounter: PropTypes.func.isRequired,
  encounterRole: PropTypes.object.isRequired,
  orderGroups: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  encounters: makeSelectEncounters(),
  encounterRole: makeSelectEncounterRole(),
  orderGroups: makeSelectExtendedOrderGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    createObservation: (observation) => dispatch(createObservation(observation)),
    createEncounter: (encounter) => dispatch(createEncounterAction(encounter)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'chemotherapyPage', reducer });
const withSaga = injectSaga({ key: 'chemotherapyPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChemotherapyPage);
