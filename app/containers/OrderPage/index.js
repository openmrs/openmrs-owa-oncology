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

import { loadRegimenList } from './actions';

import { makeSelectRegimenList, makeSelectMedications } from './selectors';
import CyclesFormControl from './components/CyclesFormControl';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const Section = styled.div`
  margin: 0 0 2rem;
`;

/* eslint-disable react/prefer-stateless-function */
export class OrderPage extends React.Component {
  state = { template: '' };

  componentDidMount() {
    this.props.loadRegimenList();
  }

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { medications } = this.props;

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
                {medications && medications.length > 0 &&
                  <MedicationTable
                    name="Premedications"
                    medications={medications[this.state.template]}
                  />
                }
                <Typography variant="headline" gutterBottom>
                  <FormattedMessage {...messages.notes} />
                </Typography>
                <Textarea
                  rows="3"
                  multiid="medication"
                  type="text"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor mi nec suscipit mattis. Mauris ut laoreet ex. Duis varius, enim sit amet dapibus molestie, metus arcu elementum sapien"
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
                  history.push('/orderSummary');
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
  loadRegimenList: PropTypes.func.isRequired,
  regimenList: PropTypes.object,
  medications: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  regimenList: makeSelectRegimenList(),
  medications: makeSelectMedications(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadRegimenList: () => dispatch(loadRegimenList()),
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
