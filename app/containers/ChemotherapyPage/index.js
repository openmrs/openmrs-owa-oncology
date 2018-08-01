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
import { makeSelectObservations } from './selectors';
import { loadObservations, createObservation } from './actions';
import { createEncounterAction } from '../Header/actions';

import Main from './components/Main';
import AdministrateForm from './components/AdministrateForm';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectEncounters,
  makeSelectEncounterRole,
  makeSelectEncounterProvider,
  // makeSelectOrderGroups,
  makeSelectParentOrderGroups,
} from '../Header/selectors';

// import { ENC_CHEMO_SESSION, ENC_ONC_CONSULT } from '../../conceptMapping.json';

const SidebarTitle = styled.div`
  padding: 1em 1em 0.5em;
`;

/* eslint-disable react/prefer-stateless-function */
export class ChemotherapyPage extends React.Component {

  componentDidMount() {
    // const { params } = this.props.match;
    const patientUuid = getParam('patientId');

    this.props.loadObservations({
      v: 'default',
      patient: patientUuid,
    });
    /*
    setTimeout(() => {

    }, 1000);
    */
    /*
    setTimeout(() => {
      this.props.createObservation({
        "person": {
          "uuid": "892c3c1c-1002-4e4d-9096-b61c89dca676",
        },
        "concept": "5d1bc5de-6a35-4195-8631-7322941fe528",
        "encounter": "00d1d220-7d6b-4481-a1e4-6f44bca08759",
        "obsDatetime": "2018-07-30T11:45:45.000-0400",
        "accessionNumber": null,
        "obsGroup": null,
        "valueCodedName": null,
        "groupMembers": null,
        "comment": "dsfd",
        "value": 1,
        "status": "FINAL",
      });
    }, 2000);
    */
  }

  getEncounterStatus() {
    // const observation = encounter.obs.map(enc)
  }

  getCurrentOrderGroup(orderGroups , uuid) {
    return orderGroups.find(orderGroup => orderGroup.uuid === uuid);
  }

  handleAdministrateFormSubmit = (data) => {
    console.log('SUBMIT');
    console.log(data);
    /*
    const patientUuid = getParam('patientId');
    this.props.createEncounter({
      encounterType: ENC_CHEMO_SESSION,
      patient: patientUuid,
      encounterProviders: [
        {
          uuid: '1f29f30d-bb43-401a-aac4-7d8eed8b398e',
        },
      ],
      obs: [
        {
          order: "51ea5ed8-d217-453e-9a12-aa3aba94f179",
          display: "Administered dose",
          concept: "595c4408-b923-4646-8486-48efde871f9e", // <ADMIN_DOSE uuid>
          person: "bf6abba0-b581-44a8-b188-ae4624801000",
          groupMembers: [
            {
              concept: "986de2e7-9c9a-473a-8afc-d4b41aa08706", // <DOSING_UNIT_QUESTION uuid>
              value: "161553AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // <some dosing unit - mg/ml/mg_per_sq_m uuid>
            },
            {
              concept: "160856AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // <QUANTITY_OF_MEDICATION uuid>
              value: "100",
            },
          ],
        },
        {
          // Physician Notes
          "display": "Clinical Impressions Notes",
          "concept": "3cd9d956-26fe-102b-80cb-0017a47871b2",
          "value": "The patient was given a reduced dose due to old age."
        },
        {
          // Cycle Status
          "display": "Single Cycle Status",
          "concept": "e270e139-f32d-4e86-9f02-175d60c3f4ac", // <uuid OG_SINGLE_CYCLE_STATUS>
          "value": "3cdcecea-26fe-102b-80cb-0017a47871b2" // <uuid for the status, in this case OG_SCL_COMPLETE>
        }
      ]
    });
    */
  }

  render() {
    const { orderGroups, match } = this.props;
    const { cycleUuid } = match.params;
    const selectedOrderGroup = this.getCurrentOrderGroup(orderGroups, cycleUuid);

    /*
    const { encounters } = this.props;

    const oncEncounters = (encounters.results || []).filter(encounter =>
      encounter.encounterType.uuid === ENC_ONC_CONSULT
    );
    const oncSessionEncounters = (encounters.results || []).filter(encounter =>
      encounter.encounterType.uuid === ENC_CHEMO_SESSION
    );
    console.log(oncSessionEncounters);
    const observation = (observations.results || [])
      .find(obs => obs.concept.uuid === CYCLE_STATUS_CONCEPT);
    */

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
  loadObservations: PropTypes.func.isRequired,
  observations: PropTypes.object.isRequired,
  encounters: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  createObservation: PropTypes.func.isRequired,
  createEncounter: PropTypes.func.isRequired,
  encounterRole: PropTypes.object.isRequired,
  encounterProvider: PropTypes.object,
  orderGroups: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  observations: makeSelectObservations(),
  encounters: makeSelectEncounters(),
  encounterRole: makeSelectEncounterRole(),
  encounterProvider: makeSelectEncounterProvider(),
  orderGroups: makeSelectParentOrderGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadObservations: (params) => dispatch(loadObservations(params)),
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
