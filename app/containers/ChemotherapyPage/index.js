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
import concepts from 'concept-mapping';
import { createObservation } from './actions';
import { createOrderGroupAction, loadExtendedOrderGroups } from '../Header/actions';

import Main from './components/Main';
import AdministrateForm from './components/AdministrateForm';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  makeSelectEncounters,
  makeSelectEncounterRole,
  makeSelectExtendedOrderGroups,
  makeSelectPatientRegimens,
} from '../Header/selectors';

const {
  ENC_CHEMO_SESSION,
  OG_SINGLE_CYCLE_STATUS,
  OG_SCS_COMPLETE,
  ADMIN_DOSE,
  NOTES,
  ML,
  MG,
  QUANTITY_OF_MEDICATION,
  DOSING_UNIT_QUESTION,
  OGAT_NUM_CYCLES,
  OGAT_CYCLE_NUMBER,
} = concepts;

const SidebarTitle = styled.div`
  padding: 1em 1em 0.5em;
`;

/* eslint-disable react/prefer-stateless-function */
export class ChemotherapyPage extends React.Component {

  componentDidUpdate(prevProps) {
    const { regimens } = this.props;
    if (prevProps.regimens.length === 0 && regimens.length > 0) {
      this.props.history.push(`/chemotherapy/${regimens[0][0].uuid}`);
    }
  }

  componentDidMount() {
    const patientUuid = getParam('patientId');
    this.props.loadExtendedOrderGroups(patientUuid);
    const { regimens } = this.props;
    if (regimens.length > 0) {
      this.props.history.push(`/chemotherapy/${regimens[0][0].uuid}`);
    }
  }

  getCurrentOrderGroup(orderGroups , uuid) {
    return orderGroups.find(orderGroup => orderGroup.uuid === uuid);
  }

  handleAdministrateFormSubmit = (data) => {
    const patientUuid = getParam('patientId');
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
          "value": OG_SCS_COMPLETE,
        },
      ],
    };
    const orderGroup = this.prepareOrderGroup(data.orderGroup);
    this.props.createOrderGroup(orderGroup, encounter);
  }

  prepareOrderGroup(orderGroup) {
    return {
      orderSet: orderGroup.orderSet.uuid,
      orderGroupReason: orderGroup.orderGroupReason.uuid,
      orders: [],
      previousOrderGroup: orderGroup.uuid,
      attributes: orderGroup.attributes.map(attr => {
        const attrObj = {
          attributeType: attr.attributeType.uuid,
          value: attr.value.uuid || attr.value.toString(),
        };
        if (attr.attributeType.uuid === OGAT_CYCLE_NUMBER) {
          attrObj.value = (attr.value + 1).toString();
        }
        return attrObj;
      }),
      nestedOrderGroups: orderGroup.nestedOrderGroups.map(orderG => ({
        orderGroupReason: orderG.orderGroupReason.uuid,
        orders: orderG.orders.map(order => ({
          type: order.type,
          route: order.route.uuid,
          dose: order.dose,
          doseUnits: order.doseUnits.uuid,
          dosingInstructions: JSON.stringify(order.dosingInstructions),
          concept: order.concept.uuid,
          careSetting: order.careSetting.uuid,
          orderer: order.orderer.uuid,
          patient: order.patient.uuid,
          dateActivated: order.dateActivated,
          autoExpireDate: order.autoExpireDate,
          dosingType: order.dosingType,
        })),
      })),
    }
  }

  getAttrValue(orderGroup, attrTypeUuid) {
    const attr = orderGroup.attributes.find(attribute =>
      attribute.attributeType.uuid === attrTypeUuid
    );
    return attr.value;
  }

  render() {
    const { orderGroups, match, regimens } = this.props;
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
              items={regimens.map((regimen, i) => ({
                id: regimen[0].uuid,
                title: regimen[0].orderSet.display,
                children: regimen.map((orderGroup, j) => ({
                  id: orderGroup.uuid,
                  cycle: this.getAttrValue(orderGroup, OGAT_CYCLE_NUMBER),
                  title: `Cycle ${this.getAttrValue(orderGroup, OGAT_CYCLE_NUMBER)} of ${this.getAttrValue(orderGroup, OGAT_NUM_CYCLES)}`,
                  date: '08/01/18',
                  status: i === 0 && j === 0 ? 'active' : 'completed',
                })),
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
                <Main
                  {...props}
                  orderGroup={selectedOrderGroup}
                />
              }
            />
            <Route
              exact
              path="/chemotherapy/:cycleUuid/administrate"
              render={props =>
                orderGroups.length > 0 &&
                  <AdministrateForm
                    {...props}
                    title={selectedOrderGroup.orderSet.display}
                    currentCycle={this.getAttrValue(selectedOrderGroup, OGAT_CYCLE_NUMBER)}
                    numOfCycles={this.getAttrValue(selectedOrderGroup, OGAT_NUM_CYCLES)}
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
  createOrderGroup: PropTypes.func.isRequired,
  encounterRole: PropTypes.object.isRequired,
  orderGroups: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  regimens: PropTypes.array,
  loadExtendedOrderGroups: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  encounters: makeSelectEncounters(),
  encounterRole: makeSelectEncounterRole(),
  orderGroups: makeSelectExtendedOrderGroups(),
  regimens: makeSelectPatientRegimens(),
});

function mapDispatchToProps(dispatch) {
  return {
    createObservation: (observation) => dispatch(createObservation(observation)),
    createOrderGroup: (orderGroup, encounter) => dispatch(createOrderGroupAction(orderGroup, encounter)),
    loadExtendedOrderGroups: (patientUuid) => dispatch(loadExtendedOrderGroups(patientUuid)),
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
