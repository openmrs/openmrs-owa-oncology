/**
 *
 * OrderPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MedicationTable from 'components/MedicationTable';
import Textarea from 'components/Textarea';

import Page from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { loadRegimenList, updateOrder, loadPatient } from './actions';

import {
  makeSelectRegimenList,
  makeSelectOrders,
  makeSelectPatient,
} from './selectors';

import CyclesFormControl from './components/CyclesFormControl';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const Section = styled.div`
  margin: 0 0 2rem;
`;

/* eslint-disable react/prefer-stateless-function */
export class OrderPage extends React.Component {
  state = { template: ''};

  componentWillMount() {
    this.props.loadPatient();
  }

  componentDidMount() {
    this.props.loadRegimenList();
  }

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleMedicationsChange = (medications) => {
    this.props.updateOrder(this.state.template, medications);
  };

  render() {
    const { orders, patient } = this.props;

    return (
      patient ?
        <Page>
          <Helmet>
            <title>Order Page</title>
            <meta name="description" content="Description of OrderPage" />
          </Helmet>
          <Grid container>
            {/* Regimen Selection */}
            <Grid item xs={6}>
              <Section>
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.selectRegimen} />
                </Typography>
                <FormControl fullWidth margin="normal">
                  <Select
                    value={this.state.template}
                    onChange={this.handleSelect}
                    displayEmpty
                    inputProps={{
                      name: 'template',
                      id: 'template',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.props.regimenList.results &&
                    this.props.regimenList.results.map(
                      ({ display, uuid }, i) => (
                        <MenuItem value={i} key={`template-${uuid}`}>
                          {display}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </Section>
            </Grid>
          </Grid>

          {/* Regimen Cycles Header */}
          {this.state.template !== "" &&
          <Grid container>
            <Grid item xs={12}>
              <Section>
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.cycles} />
                </Typography>
                <CyclesFormControl />
              </Section>
            </Grid>

            <Grid item xs={12}>
              <Section>
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.medications} />
                </Typography>
                {orders && orders.length > 0 &&
                  <MedicationTable
                    name="Premedications"
                    medications={orders[this.state.template]}
                    onMedicationsChange={this.handleMedicationsChange}
                  />
                }
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.notes} />
                </Typography>
                <Textarea
                  rows="3"
                  multiid="medication"
                  type="text"
                  placeholder="Add your notes here..."
                  fullWidth
                />
              </Section>
            </Grid>
          </Grid>
          }
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="center"
          >
            <Route
              render={({ history }) => (
                <Button
                  variant="contained"
                  disabled={this.state.template === ""}
                  onClick={() => {
                    history.push(`/orderSummary/${this.state.template}`);
                  }}
                >
                  <FormattedMessage {...messages.next} />
                </Button>
              )}
            />
          </Grid>
        </Page>
        :
        <Page>
          <Helmet>
            <title>Order Page</title>
            <meta name="description" content="Description of OrderPage" />
          </Helmet>
          <Grid container>
            {/* Regimen Selection */}
            <Grid item xs={12}>
              <Typography variant="headline" gutterBottom>
                <FormattedMessage {...messages.noPatient} />
              </Typography>
            </Grid>
          </Grid>
        </Page>
    );
  }
}

OrderPage.propTypes = {
  location: PropTypes.shape({search: PropTypes.string}).isRequired,
  loadRegimenList: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  regimenList: PropTypes.object,
  orders: PropTypes.array,
  loadPatient: PropTypes.func.isRequired,
  patient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  regimenList: makeSelectRegimenList(),
  orders: makeSelectOrders(),
  patient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadRegimenList: () => dispatch(loadRegimenList()),
    updateOrder: (index, order) => dispatch(updateOrder(index, order)),
    loadPatient: () => dispatch(loadPatient()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'orderPage', reducer });
const withSaga = injectSaga({ key: 'orderPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrderPage);
