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

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import {
  OGR_PREMEDICATION,
  OGR_CHEMOTHERAPY,
  OGR_POSTMEDICATION,
} from '../../../../conceptMapping.json';

const Head = styled.div`
  overflow: hidden;
  margin-bottom: 1em;
`;
const HeadActions = styled.div`
  float: right;
`;

function getMedicationsByReason(orderGroups, reasonUuid) {
  const orderGroup = orderGroups.find(orderGr =>
    orderGr.orderGroupReason.uuid === reasonUuid
  );
  return (orderGroup && orderGroup.orders) || [];
}

function Main(props) {
  const { params } = props.match;
  const { orderGroup } = props;
  const subOrders = (orderGroup && orderGroup.nestedOrderGroups) || [];

  const tables = [{
    name: 'Premedications',
    reasonUuid: OGR_PREMEDICATION,
  }, {
    name: 'Chemotherapy',
    reasonUuid: OGR_CHEMOTHERAPY,
  }, {
    name: 'Postmedications',
    reasonUuid: OGR_POSTMEDICATION,
  }];

  return (
    <div>
      <Head>
        <HeadActions>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/chemotherapy/${params.cycleUuid}/administrate`}
          >
            Administer
          </Button>
          &nbsp;&nbsp;
          <Button variant="outlined">
            Modify order
          </Button>
        </HeadActions>
        <Typography variant="headline">
          CHOP: Protocol for Non Hodgkin Lymphome
        </Typography>
        <Typography variant="subheading">
          Cycle 3 of 6
        </Typography>
      </Head>
      {tables.map(({ name, reasonUuid }) =>
        <MedicationTable
          key={reasonUuid}
          readOnly
          name={name}
          medications={getMedicationsByReason(subOrders, reasonUuid)}
        />
      )}
      <Typography variant="subheading">
        Cycle summary
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e
      </Typography>
    </div>
  );
}

Main.propTypes = {
  match: PropTypes.object.isRequired,
  orderGroup: PropTypes.object,
};

export default Main;
