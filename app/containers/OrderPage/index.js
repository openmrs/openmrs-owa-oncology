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
import MedicationList from 'components/MedicationList';

import Page from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { loadRegimenList } from './actions';

import { makeSelectRegimenList } from './selectors';
import EditMedicationDialog from './components/EditMedicationDialog';
import CyclesFormControl from './components/CyclesFormControl';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const Section = styled.div`
  margin: 0 0 2rem;
`;

/* eslint-disable react/prefer-stateless-function */
export class OrderPage extends React.Component {
  state = { template: 0, openEditDialog: false };

  templates = [
    'CHOP Protocol for Non Hodking Lymphome',
    'CHOP Protocol for Non Hodking Lymphome 2',
    'CHOP Protocol for Non Hodking Lymphome 3',
    'CHOP Protocol for Non Hodking Lymphome 4',
  ];

  componentDidMount() {
    this.props.loadRegimenList();
  }

  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
              <Typography variant="display1" gutterBottom>
                <FormattedMessage {...messages.selectRegimen} />
              </Typography>
              <FormControl fullWidth margin="normal">
                <Select
                  value={this.state.template}
                  onChange={this.handleSelect}
                  inputProps={{
                    name: 'template',
                    id: 'template',
                  }}
                >
                  {this.props.regimenList.results &&
                    this.props.regimenList.results.map(({ display }, i) => (
                      <MenuItem value={i} key={`template-${display}`}>
                        {display}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Section>
          </Grid>

          {/* Regimen Cycles Header */}
          <Grid item xs={12}>
            <Section>
              <Typography variant="display1" gutterBottom>
                <FormattedMessage {...messages.cycles} />
              </Typography>
              <CyclesFormControl />
            </Section>
          </Grid>

          <Grid item xs={12}>
            <Section>
              <Typography variant="display1" gutterBottom>
                <FormattedMessage {...messages.medications} />
              </Typography>
              <MedicationList />
            </Section>
          </Grid>

          <Grid item xs={12}>
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
                    onClick={() => {
                      history.push('/orderSummary');
                    }}
                  >
                    <FormattedMessage {...messages.next} />
                  </Button>
                )}
              />
            </Grid>
          </Grid>

          <EditMedicationDialog
            open={this.state.openEditDialog}
            onSave={() => this.setState({ openEditDialog: false })}
            onClose={() => this.setState({ openEditDialog: false })}
          />
          <Button onClick={() => this.setState({ openEditDialog: true })}>
            Edit dialog
          </Button>
        </Grid>
      </Page>
    );
  }
}

OrderPage.propTypes = {
  loadRegimenList: PropTypes.func.isRequired,
  regimenList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  regimenList: makeSelectRegimenList(),
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
