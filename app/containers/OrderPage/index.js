/**
 *
 * OrderPage
 *
 */

import React from 'react';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Page from 'components/Page';
import MedicationList from 'components/MedicationList';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOrderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class OrderPage extends React.Component {
  state = {
    cycles: 0,
    value: '0',
    regemins: [], // array of defined regimens
    selectedRegimen: '',
    // regeminData: {}, // data associated with selected regimen's
  };

  render() {
    const menuItems = this.state.regemins.map(item => (
      <MenuItem key={item.uuid} value={item.detailsUri}>
        {item.displayName}
      </MenuItem>
    ));

    return (
      <Page>
        <Helmet>
          <title>OrderPage</title>
          <meta name="description" content="Description of OrderPage" />
        </Helmet>
        <Grid container>
          {/* Regimen Selection Header */}
          <Grid item xs={12}>
            <Typography variant="display1" gutterBottom>
              <FormattedMessage {...messages.selectRegimen} />
            </Typography>
          </Grid>

          {/* Regimen Selection */}
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="regemin-simple">Regimen</InputLabel>
              <Select
                value={this.state.selectedRegimen}
                onChange={this.handleChange}
                inputProps={{
                  name: 'regeminDisplayName',
                  id: 'regemin-simple',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {menuItems}
              </Select>
            </FormControl>
          </Grid>

          {/* Regimen Cycles Header */}
          <Grid item xs={12}>
            <Typography variant="display1" gutterBottom>
              <FormattedMessage {...messages.cycles} />
            </Typography>
          </Grid>

          {/* Regimen Cycles */}
          <Grid item xs={12}>
            <FormControl component="fieldset" required>
              <RadioGroup
                aria-label="Gender"
                name="gender1"
                value={this.state.value}
                onChange={(e, value) => {
                  this.setState({ value });
                }}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio color="primary" />}
                  label={
                    <span>
                      Every&nbsp;&nbsp;
                      <FormControl>
                        <Select
                          value={this.state.cycles}
                          onChange={this.handleChange}
                          inputProps={{
                            name: 'cycles',
                            id: 'cycles-simple',
                          }}
                        >
                          <MenuItem value={0}>1 week</MenuItem>
                          <MenuItem value={1}>2 weeks</MenuItem>
                          <MenuItem value={2}>3 weeks</MenuItem>
                        </Select>
                      </FormControl>
                      &nbsp;&nbsp;x&nbsp;&nbsp;
                      <TextField
                        style={{ width: '50px' }}
                        id="cycles"
                        placeholder="6"
                      />
                      &nbsp;&nbsp;cycles
                    </span>
                  }
                />
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label={
                    <span>
                      Day&nbsp;&nbsp;
                      <TextField
                        style={{ width: '80px' }}
                        id="days"
                        placeholder="1, 8, 15"
                      />
                      &nbsp;&nbsp;of&nbsp;&nbsp;
                      <TextField
                        style={{ width: '50px' }}
                        id="days"
                        placeholder="28"
                      />
                      &nbsp;&nbsp;day cycle x&nbsp;&nbsp;
                      <TextField
                        style={{ width: '50px' }}
                        id="cycles"
                        placeholder="6"
                      />
                      &nbsp;&nbsp;cycles
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <MedicationList />
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
        </Grid>
      </Page>
    );
  }
}

OrderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  orderpage: makeSelectOrderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
