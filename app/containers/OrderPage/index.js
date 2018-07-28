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
  makeSelectPremedications,
  makeSelectChemotherapy,
  makeSelectPatient,
  makeSelectOrders,
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

  componentDidMount() {
    this.props.loadPatient();
    if (!(this.props.orders.length > 0)) {
      this.props.loadRegimenList();
    }
  }

  handleSelectTemplate = e => {
    this.props.history.push(`/order/${e.target.value}`);
  };

  handleMedicationsChange = (updatedMedications, orderReason) => {
    const { orders, match } = this.props;
    const { template }  = match.params;
    const newOrder = {
      ...orders[template],
      medications: orders[template].medications.map(medication =>
        (medication.orderReason !== orderReason && medication) ||
          updatedMedications.find(m => m.uuid === medication.uuid)
      ).filter(m => m),
    }
    this.props.updateOrder(template, newOrder);
  };

  handleNotesChange = (e) => {
    const { orders, match } = this.props;
    const { template }  = match.params;
    this.props.updateOrder(template, { ...orders[template], notes: e.target.value });
  }

  handleCycleDescriptionChange = (cyclesDescription) => {
    const { orders, match } = this.props;
    const { template }  = match.params;
    this.props.updateOrder(template, { ...orders[template], cyclesDescription });
  }

  render() {
    const {
      orders,
      patient,
      premedications,
      chemotherapy,
      regimenList,
      match,
    } = this.props;
    const { template } = match.params;

    if (!patient) {
      return (
        <Page>
          <Typography variant="headline" gutterBottom>
            <FormattedMessage {...messages.noPatient} />
          </Typography>
        </Page>
      );
    }

    return (
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
                  value={template >= 0 ? +template : ''}
                  onChange={this.handleSelectTemplate}
                  displayEmpty
                  inputProps={{
                    name: 'template',
                    id: 'template',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {regimenList.results && regimenList.results.map(
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
        {template >= 0 && orders.length > 0 &&
          <Grid container>
            <Grid item xs={12}>
              <Section>
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.cycles} />
                </Typography>
                <CyclesFormControl
                  cyclesDescription={orders[template].cyclesDescription}
                  onCyclesDescriptionChange={this.handleCycleDescriptionChange}
                />
              </Section>
            </Grid>

            <Grid item xs={12}>
              <Section>
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.medications} />
                </Typography>
                {premedications && premedications[template].length > 0 &&
                  <MedicationTable
                    name="Premedications"
                    medications={premedications[template]}
                    onMedicationsChange={(meds) => this.handleMedicationsChange(meds, 'Premedication')}
                  />
                }
                {chemotherapy && chemotherapy[template].length > 0 &&
                  <MedicationTable
                    name="Chemotherapy"
                    medications={chemotherapy[template]}
                    onMedicationsChange={(meds) => this.handleMedicationsChange(meds, 'Chemotherapy')}
                  />
                }
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.notes} />
                </Typography>
                <Textarea
                  rows="3"
                  multiid="medication"
                  value={orders[template].notes}
                  onChange={this.handleNotesChange}
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
                disabled={template === ""}
                onClick={() => {
                  history.push(`/order/${template}/summary`);
                }}
              >
                <FormattedMessage {...messages.next} />
              </Button>
            )}
          />
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
  loadPatient: PropTypes.func.isRequired,
  patient: PropTypes.object,
  premedications: PropTypes.array.isRequired,
  chemotherapy: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  regimenList: makeSelectRegimenList(),
  patient: makeSelectPatient(),
  premedications: makeSelectPremedications(),
  chemotherapy: makeSelectChemotherapy(),
  orders: makeSelectOrders(),
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
