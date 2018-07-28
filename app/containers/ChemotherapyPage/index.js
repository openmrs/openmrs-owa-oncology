/**
 *
 * ChemotherapyPage
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
import Paper from '@material-ui/core/Paper';

import NaviList from 'components/NaviList';
import Page from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectChemotherapyPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ChemotherapyPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ChemotherapyPage</title>
          <meta name="description" content="Description of ChemotherapyPage" />
        </Helmet>
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <Paper square style={{ height: '100%' }}>
              <NaviList
                items={[
                  {
                    id: 1,
                    title: 'CHOP Protocol for Non Hodgkin Lymphome',
                    status: 'current',
                    children: [
                      {
                        id: 11,
                        title: 'Cycle 1 of 6',
                        date: '08/01/18',
                        status: 'completed',
                      }, {
                        id: 12,
                        title: 'Cycle 2 of 6',
                        date: '08/01/18',
                        status: 'completed',
                      }, {
                        id: 13,
                        title: 'Cycle 3 of 6',
                        date: '08/01/18',
                        status: 'current',
                      },
                    ],
                  }, {
                    id: 2,
                    title: 'CHOP Protocol for Non Hodgkin Lymphome',
                    status: 'completed',
                    children: [
                      {
                        id: 21,
                        title: 'Cycle 1 of 6',
                        date: '08/01/18',
                        status: 'completed',
                      }, {
                        id: 22,
                        title: 'Cycle 2 of 6',
                        date: '08/01/18',
                        status: 'completed',
                      }, {
                        id: 23,
                        title: 'Cycle 3 of 6',
                        date: '08/01/18',
                        status: 'completed',
                      },
                    ],
                  },
                ]}
              />
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Page>
              <FormattedMessage {...messages.header} />
            </Page>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ChemotherapyPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chemotherapypage: makeSelectChemotherapyPage(),
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

const withReducer = injectReducer({ key: 'chemotherapyPage', reducer });
const withSaga = injectSaga({ key: 'chemotherapyPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChemotherapyPage);
