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
  makeSelectCurrentProvider,
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
      this.props.createEncounter({
        encounterType: ENC_CHEMO_SESSION,
        patient: patientUuid,
        obs: [
          {
            "concept": "5d1bc5de-6a35-4195-8631-7322941fe528",
            "value": 1,
          },
        ],
      });
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

  render() {
    const { orderGroups, match } = this.props;
    const { cycleUuid } = match.params;

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
                <Main {...props} orderGroup={this.getCurrentOrderGroup(orderGroups, cycleUuid)} />
              }
            />
            <Route exact path="/chemotherapy/:cycleUuid/administrate" component={AdministrateForm} />
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
  currentProvider: PropTypes.object,
  orderGroups: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  observations: makeSelectObservations(),
  encounters: makeSelectEncounters(),
  encounterRole: makeSelectEncounterRole(),
  currentProvider: makeSelectCurrentProvider(),
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
