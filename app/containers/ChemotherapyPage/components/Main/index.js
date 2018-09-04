/**
 *
 * Main
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MedicationTable from 'components/MedicationTable';
import concepts from 'concept-mapping';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const {
  OGR_PREMEDICATION,
  OGR_CHEMOTHERAPY,
  OGR_POSTMEDICATION,
  OG_SCS_COMPLETE,
  OGAT_CYCLE_NUMBER,
  NOTES,
  OGAT_NUM_CYCLES,
  ADMIN_DOSE,
  DOSING_UNIT_QUESTION,
  QUANTITY_OF_MEDICATION,
} = concepts;

const Head = styled.div`
  overflow: hidden;
  margin-bottom: 1em;
`;
const HeadActions = styled.div`
  float: right;
`;

export class Main extends React.Component {
  tables = [{
    name: 'Premedications',
    reasonUuid: OGR_PREMEDICATION,
  }, {
    name: 'Chemotherapy',
    reasonUuid: OGR_CHEMOTHERAPY,
  }, {
    name: 'Postmedications',
    reasonUuid: OGR_POSTMEDICATION,
  }];

  getMedicationsByReason(orderGroups, reasonUuid) {
    if (!this.props.orderGroup) {
      return []
    }
    const { treatmentSessionEncounter } = this.props.orderGroup;
    const orderGroup = orderGroups.find(orderGr =>
      orderGr.orderGroupReason.uuid === reasonUuid
    );
    let orders = (orderGroup && orderGroup.orders) || [];
    if (reasonUuid === OGR_CHEMOTHERAPY && treatmentSessionEncounter) {
      const { obs } = treatmentSessionEncounter;
      orders = orders.map(order => {
        const administeredDose = [];
        obs.filter(o =>
          o.concept.uuid === ADMIN_DOSE && o.order.uuid === order.uuid
        ).forEach(o => {
          const unit = o.groupMembers.find(groupMember =>
            groupMember.concept.uuid === DOSING_UNIT_QUESTION
          );
          const value = o.groupMembers.find(groupMember =>
            groupMember.concept.uuid === QUANTITY_OF_MEDICATION
          );
          administeredDose.push({
            units: unit.value.display,
            value: value.value,
            uuid: o.uuid,
          });
        });
        return {
          ...order,
          administeredDose,
        };
      });
    }
    return orders;
  }

  isOrderComplete(orderGroup) {
    let result = false;
    if (orderGroup &&
      orderGroup.treatmentSessionEncounter &&
      orderGroup.treatmentSessionEncounter.obs.length > 0) {
      const obs = orderGroup.treatmentSessionEncounter.obs.find(o =>
        o.value && o.value.uuid === OG_SCS_COMPLETE
      )
      if (obs) {
        result = true;
      }
    }
    return result;
  }
  getNotes(orderGroup) {
    let result = '';
    if (orderGroup &&
      orderGroup.treatmentSessionEncounter &&
      orderGroup.treatmentSessionEncounter.obs.length > 0) {
      const obs = orderGroup.treatmentSessionEncounter.obs.find(o =>
        o.concept && o.concept.uuid === NOTES
      )
      if (obs) {
        result = obs.value;
      }
    }
    return result;
  }

  getAttrValue(orderGroup, type) {
    let result = '-';
    if (orderGroup) {
      const attr = orderGroup.attributes.find(a =>
        a.attributeType.uuid === type
      );
      if (attr) {
        result = attr.value;
      }
    }
    return result;
  }

  render() {
    const { params } = this.props.match;
    const { orderGroup } = this.props;
    const isOrderComplete = this.isOrderComplete(orderGroup);
    const notes = this.getNotes(orderGroup);
    const subOrders = (orderGroup && orderGroup.nestedOrderGroups) || [];

    return (
      <div>
        <Head>
          <HeadActions>
            {!isOrderComplete &&
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/chemotherapy/${params.cycleUuid}/administrate`}
              >
                Document
              </Button>
            }
            &nbsp;&nbsp;
            <Button variant="outlined">
              Modify order
            </Button>
          </HeadActions>
          <Typography variant="headline">
            {orderGroup && orderGroup.orderSet.display}
          </Typography>
          <Typography variant="subheading">
            Cycle {this.getAttrValue(orderGroup, OGAT_CYCLE_NUMBER)} of {this.getAttrValue(orderGroup, OGAT_NUM_CYCLES)}
          </Typography>
        </Head>
        {this.tables.map(({ name, reasonUuid }) =>
          <MedicationTable
            key={reasonUuid}
            readOnly
            name={name}
            includeAdministeredDose={reasonUuid === OGR_CHEMOTHERAPY}
            medications={this.getMedicationsByReason(subOrders, reasonUuid)}
          />
        )}
        {notes &&
          <div>
            <Typography variant="subheading">
              Cycle summary
            </Typography>
            <Typography variant="body1">
              {notes}
            </Typography>
          </div>
        }
      </div>
    );
  }
}

Main.propTypes = {
  match: PropTypes.object.isRequired,
  orderGroup: PropTypes.object,
};

export default Main;
