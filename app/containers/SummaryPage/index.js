/**
 *
 * SummaryPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSummaryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class SummaryPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Order Summary</title>
          <meta name="description" content="Description of SummaryPage" />
        </Helmet>

        <Grid container>
          {/* Regimen Selection Header */}
          <Grid item xs={12}>
            <Typography variant="display1" gutterBottom>
              <FormattedMessage {...messages.header} />
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SummaryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  summarypage: makeSelectSummaryPage(),
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

const withReducer = injectReducer({ key: 'summaryPage', reducer });
const withSaga = injectSaga({ key: 'summaryPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SummaryPage);
