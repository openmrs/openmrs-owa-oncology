/**
 *
 * AdministrateForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Textarea from 'components/Textarea';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import {
  OGR_CHEMOTHERAPY,
} from '../../../../conceptMapping.json';

const Head = styled.div`
  margin-bottom: 1em;
`;

const ListWrapper = styled.div`
  margin-bottom: 1em;
`;

const Actions = styled.div`
  text-align: center;
  margin: 2em 0;
`;

export class AdministrateForm extends React.Component {

  constructor(props) {
    super(props);

    const orders = this.getOrders(props.orderGroup);
    const ordersObj = {};
    orders.forEach(order => {
      ordersObj[order.uuid] = {
        ml: '',
        mg: '',
      };
    });
    this.state = {
      notes: '',
      orders: ordersObj,
    };
  }

  getOrders(orderGroup) {
    const subOrders = (orderGroup && orderGroup.nestedOrderGroups) || [];
    const chemoOrder = subOrders.find(orderGr =>
      orderGr.orderGroupReason.uuid === OGR_CHEMOTHERAPY
    );
    return (chemoOrder && chemoOrder.orders) || [];
  }

  handleDoseChange(e, uuid, name) {
    const { orders } = this.state;
    this.setState({
      orders: {
        ...orders,
        [uuid]: {
          ...orders[uuid],
          [name]: e.target.value,
        },
      },
    })
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    if (onFormSubmit) {
      onFormSubmit({
        ...this.state,
        orderGroup: this.props.orderGroup,
      });
    }
  }

  render() {
    const { match, orderGroup } = this.props;
    const orders = this.getOrders(orderGroup);

    return (
      <div>
        <Head>
          <Typography variant="headline">
            CHOP: Protocol for Non Hodgkin Lymphome
          </Typography>
          <Typography variant="subheading">
            Cycle 3 of 6
          </Typography>
        </Head>
        <Grid container spacing={16}>
          <Grid item md={10} sm={12} lg={8}>
            <Typography variant="subheading">Please record the dosage given to the patient.</Typography>
            <ListWrapper>
              <List>
                {orders.map(order =>
                  <ListItem
                    divider
                    key={order.uuid}
                  >
                    <ListItemText
                      primary={order.concept && order.concept.display}
                      secondary={`${order.dose}${order.doseUnits && order.doseUnits.display}`}
                    />
                    <TextField
                      id="mg"
                      label="mg"
                      style={{ width: 60 }}
                      placeholder="-"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.orders[order.uuid].mg}
                      onChange={(e) => this.handleDoseChange(e, order.uuid, 'mg')}
                    />
                    &nbsp;
                    &nbsp;
                    <TextField
                      id="ml"
                      label="ml"
                      style={{ width: 60 }}
                      placeholder="-"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={this.state.orders[order.uuid].ml}
                      onChange={(e) => this.handleDoseChange(e, order.uuid, 'ml')}
                    />
                  </ListItem>
                )}
              </List>
            </ListWrapper>
            <Typography variant="subheading">Cycle summary notes</Typography>
            <Textarea
              rows="3"
              fullWidth
              placeholder="Typo your summary here..."
              value={this.state.notes}
              onChange={e => this.setState({ notes: e.target.value })}
            />
            <Actions>
              <Button
                variant="outlined"
                component={Link}
                to={`/chemotherapy/${match.params.cycleUuid}`}
              >
                Cancel
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Actions>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AdministrateForm.propTypes = {
  orderGroup: PropTypes.object,
  match: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func,
};

export default AdministrateForm;
