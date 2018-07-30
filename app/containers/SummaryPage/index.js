import React from 'react';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
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
  makeSelectPatient,

} from '../OrderPage/selectors';
import {
  makeSelectEncounterType,
  makeSelectEncounterRole,
  makeSelectEncounterProvider,
  makeSelectEncounterLocation,
} from '../Header/selectors'

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { postChemoOrderAction } from './actions';

import SummaryMedListControl from './components/SummaryMedListControl';

const Section = styled.div`
  margin: 0 0 2rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  >button {
    margin: 0px 20px;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class SummaryPage extends React.Component {

  submitOrder() {
    try {
      const encounterObj = this.createEncounterObject();
      const orderObj = this.createOrderObject()
      this.props.postChemoOrder(encounterObj, orderObj);  
    } catch (error) {
      console.error('Unable to create order');
    }
  }

  createEncounterObject() {
    const dummyLocation =
    {

      "uuid": "afa09010-43b6-4f19-89e0-58d09941bcbd",
      "display": "Ijans Resepsyon",
      "name": "Ijans Resepsyon",
      "description": "Emergency registration and check-in",
      "address1": null,
      "address2": null,
      "cityVillage": null,
      "stateProvince": null,
      "country": null,
      "postalCode": null,
      "latitude": null,
      "longitude": null,
      "countyDistrict": null,
      "address3": null,
      "address4": null,
      "address5": null,
      "address6": null,
      "tags": [{
        "uuid": "8fa112e0-e506-11e4-b571-0800200c9a66",
        "display": "Registration Location",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/8fa112e0-e506-11e4-b571-0800200c9a66",
        }],
      }, {
        "uuid": "5e824f3a-dfb8-11e4-bccc-56847afe9799",
        "display": "Inpatients App Location",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/5e824f3a-dfb8-11e4-bccc-56847afe9799",
        }],
      }, {
        "uuid": "b8bbf83e-645f-451f-8efe-a0db56f09676",
        "display": "Login Location",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676",
        }],
      }],
      "parentLocation": {
        "uuid": "24bd1390-5959-11e4-8ed6-0800200c9a66",
        "display": "Hôpital Universitaire de Mirebalais - Prensipal",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/24bd1390-5959-11e4-8ed6-0800200c9a66",
        }],
      },
      "childLocations": [],
      "retired": false,
      "attributes": [{
        "uuid": "709ee7f1-5d3d-493d-a931-6fca9a49b7ff",
        "display": "Location Code: M034",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/afa09010-43b6-4f19-89e0-58d09941bcbd/attribute/709ee7f1-5d3d-493d-a931-6fca9a49b7ff",
        }],
      }, {
        "uuid": "052f1b66-c857-4fde-8ca7-6eead559e64c",
        "display": "Default ID card Printer: Printer[hashCode=62a6388b,uuid=ef9a8933-3433-46be-8fc6-200060f4fc72]",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/afa09010-43b6-4f19-89e0-58d09941bcbd/attribute/052f1b66-c857-4fde-8ca7-6eead559e64c",
        }],
      }, {
        "uuid": "4b48d247-2cfe-4123-aa4c-85758ac337a4",
        "display": "Default Label Printer: Printer[hashCode=8613c66c,uuid=eb60696e-bf5a-4c19-b2c3-6a256e2cf6db]",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/afa09010-43b6-4f19-89e0-58d09941bcbd/attribute/4b48d247-2cfe-4123-aa4c-85758ac337a4",
        }],
      }, {
        "uuid": "e5b6b920-f5c2-4400-b5f2-a0ee3f7c9f60",
        "display": "Default Wristband Printer: Printer[hashCode=6c08aa63,uuid=6bed3067-478d-43d6-b1c0-38c4dc3dd860]",
        "links": [{
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/afa09010-43b6-4f19-89e0-58d09941bcbd/attribute/e5b6b920-f5c2-4400-b5f2-a0ee3f7c9f60",
        }],
      }],
      "address7": null,
      "address8": null,
      "address9": null,
      "address10": null,
      "address11": null,
      "address12": null,
      "address13": null,
      "address14": null,
      "address15": null,
      "links": [{
        "rel": "self",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/afa09010-43b6-4f19-89e0-58d09941bcbd",
      }, {
        "rel": "full",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/afa09010-43b6-4f19-89e0-58d09941bcbd?v=full",
      }],
      "resourceVersion": "2.0",
    }

    const drEncounterType = "035fb8da-226a-420b-8d8b-3904f3bedb25";

    return {
      encounterProviders:[{
        encounterRole: this.props.encounterRole.results[0].uuid,
        provider: this.props.encounterProvider.uuid,
      }],
      encounterType: drEncounterType,
      location: this.props.encounterlocation || dummyLocation,
      patient: this.props.patient.uuid,
    };
  }
  
  createOrderObject() {
    return {
      encounter: '',
      orderset: '',
      // patient: this.props.patient.uuid,      // not sure if we need to send this
      orders: [
        {},   // this will be similar to the template;
        {},
      ],
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

            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="center"
              >
                <ButtonContainer>
                  <Route
                    render={({ history }) => (
                      <Button
                        variant="contained"
                        onClick={() => {
                          history.push(`/order/${orderIndex}`);
                        }}
                      >
                        <FormattedMessage {...messages.back} />
                      </Button>
                    )}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => this.submitOrder()}
                  >
                    <FormattedMessage {...messages.submit} />
                  </Button>
                </ButtonContainer>
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
  encounterProvider: PropTypes.object,
  encounterlocation: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  premedications: makeSelectPremedications(),
  chemotherapy: makeSelectChemotherapy(),
  postmedications: makeSelectPostmedications(),
  orders: makeSelectOrders(),
  patient: makeSelectPatient(),
  encounterType: makeSelectEncounterType(),
  encounterRole: makeSelectEncounterRole(),
  encounterProvider: makeSelectEncounterProvider(),
  encounterlocation: makeSelectEncounterLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    postChemoOrder: (encounter, order) => dispatch(postChemoOrderAction(encounter, order)),
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
