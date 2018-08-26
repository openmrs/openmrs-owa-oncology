import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Grid, Typography, Button } from '@material-ui/core';

import Page from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectPremedications,
  makeSelectChemotherapy,
  makeSelectPostmedications,
  makeSelectOrders,
} from '../OrderPage/selectors';
import {
  makeSelectEncounterType,
  makeSelectEncounterRole,
  makeSelectCurrentProvider,
  makeSelectEncounterLocation,
  makeSelectPatient,
} from '../Header/selectors';

import {
  ENC_ONC_CONSULT,
  ENCOUTER_LOCATION,
} from '../../conceptMapping.json'

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { postChemoOrderAction } from './actions';

import SummaryMedListControl from './components/SummaryMedListControl';

const Section = styled.div`
  margin: 0 0 2rem;
  width: 100%;
`;

/* eslint-disable react/prefer-stateless-function */
export class SummaryPage extends React.Component {

  submitOrder(orderIndex) {
    try {
      const encounterObj = this.createEncounterObject();
      this.props.postChemoOrder({encounterObj, orderIndex, patientUuid: this.props.patient.uuid});
    } catch (error) {
      console.error('Unable to create order');
    }
  }

  createEncounterObject() {
    return {
      encounterProviders:[{
        encounterRole: this.props.encounterRole.results[0].uuid,
        provider: this.props.currentProvider.uuid,
      }],
      encounterType: ENC_ONC_CONSULT,
      location: ENCOUTER_LOCATION,
      patient: this.props.patient.uuid,
    };
  }

  render() {
    const {
      orders,
      premedications,
      chemotherapy,
      postmedications,
      match,
    } = this.props
    const { from } = this.props.location.state || { from: { pathname: "/order" } };

    if (chemotherapy.length === 0) {
      return <Redirect to={from}/>;
    }

    const orderIndex = match.params.template;
    const { regimenName, cyclesDescription } = orders[orderIndex];

    return (
      <Page>
        <div>
          <Helmet>
            <title>Order Summary</title>
            <meta name="description" content="Description of SummaryPage" />
          </Helmet>

          <Grid container>
            <Grid item xs={12}>
              <Section>
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.header} />
                </Typography>
              </Section>

              <Typography variant="title" gutterBottom>
                {regimenName}
              </Typography>

              <Typography variant="subheading" gutterBottom>
                Every {cyclesDescription.cycleDuration/7} weeks x {cyclesDescription.cycles} cycles
              </Typography>
            </Grid>

            <Section>
              <Grid container spacing={16}>
                {premedications[orderIndex].length > 0 &&
                  <Grid item xs={12}>
                    <SummaryMedListControl medications={premedications} orderIndex={orderIndex} label="PREMEDICATION"></SummaryMedListControl>
                  </Grid>
                }

                {chemotherapy[orderIndex].length > 0 &&
                  <Grid item xs={12}>
                    <SummaryMedListControl medications={chemotherapy} orderIndex={orderIndex} label="CHEMOTHERAPY"></SummaryMedListControl>
                  </Grid>
                }

                {postmedications[orderIndex].length > 0 &&
                  <Grid item xs={12}>
                    <SummaryMedListControl medications={postmedications} orderIndex={orderIndex} label="POSTMEDICATIONS"></SummaryMedListControl>
                  </Grid>
                }
              </Grid>
            </Section>

            {orders[orderIndex].notes &&
              <Section>
                <Grid item xs={12}>
                  <Typography variant="headline" gutterBottom>
                    <FormattedMessage {...messages.notes} />
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {orders[orderIndex].notes}
                  </Typography>
                </Grid>
              </Section>
            }

            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="center"
              >
                <Button
                  variant="contained"
                  component={Link}
                  to={`/order/${orderIndex}`}
                >
                  <FormattedMessage {...messages.back} />
                </Button>
                &nbsp;&nbsp;
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.submitOrder(orderIndex)}
                >
                  <FormattedMessage {...messages.submit} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Page>
    );
  }
}

SummaryPage.propTypes = {
  premedications: PropTypes.array.isRequired,
  chemotherapy: PropTypes.array.isRequired,
  postmedications: PropTypes.array.isRequired,
  match: PropTypes.object,
  location: PropTypes.object.isRequired,
  postChemoOrder: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  patient: PropTypes.object,
  encounterType: PropTypes.object.isRequired,
  encounterRole: PropTypes.object.isRequired,
  currentProvider: PropTypes.object,
  encounterlocation: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  premedications: makeSelectPremedications(),
  chemotherapy: makeSelectChemotherapy(),
  postmedications: makeSelectPostmedications(),
  orders: makeSelectOrders(),
  patient: makeSelectPatient(),
  encounterType: makeSelectEncounterType(),
  encounterRole: makeSelectEncounterRole(),
  currentProvider: makeSelectCurrentProvider(),
  encounterlocation: makeSelectEncounterLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    postChemoOrder: (orderInfo) => dispatch(postChemoOrderAction(orderInfo)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'summaryPage', reducer });
const withSaga = injectSaga({ key: 'summaryPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SummaryPage);
