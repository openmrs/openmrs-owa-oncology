/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DashboardCard from 'components/DashboardCard';
import Page from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  overflow: hidden;
  margin-bottom: 0.25em;
`;

const ListKey = styled.div`
  width: 160px;
  float: left;
`;

const ListValue = styled.div`
`;

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.Component {
  render() {
    return (
      <Page>
        <Helmet>
          <title>DashboardPage</title>
          <meta name="description" content="Description of DashboardPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <br/>
        <br/>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <DashboardCard
              title="REGIMEN"
              footer={
                <Button
                  component={Link}
                  color="primary"
                  variant="contained"
                  to="/chemotherapy"
                >
                  Open
                </Button>
              }
            >
              <List>
                <ListItem>
                  <ListKey>
                    <Typography variant="body2">
                      Chemo set
                    </Typography>
                  </ListKey>
                  <ListValue>
                    <Typography variant="body1">
                      CHOP
                    </Typography>
                  </ListValue>
                </ListItem>
                <ListItem>
                  <ListKey>
                    <Typography variant="body2">
                      Current Cycle
                    </Typography>
                  </ListKey>
                  <ListValue>
                    <Typography variant="body1">
                      2 of 6
                    </Typography>
                  </ListValue>
                </ListItem>
                <ListItem>
                  <ListKey>
                    <Typography variant="body2">
                      Physician note
                    </Typography>
                  </ListKey>
                  <ListValue>
                    <Typography variant="body1">
                      Patient has a weak heart so be careful when giving XX
                    </Typography>
                  </ListValue>
                </ListItem>
                <ListItem>
                  <ListKey>
                    <Typography variant="body2">
                      Last cycle date
                    </Typography>
                  </ListKey>
                  <ListValue>
                    <Typography variant="body1">
                      2018/09/23
                    </Typography>
                  </ListValue>
                </ListItem>
                <ListItem>
                  <ListKey>
                    <Typography variant="body2">
                      Last cycle summary:
                    </Typography>
                  </ListKey>
                  <ListValue>
                    <Typography variant="body1">
                      Medication was reduced because of fever.
                    </Typography>
                  </ListValue>
                </ListItem>
              </List>
            </DashboardCard>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardpage: makeSelectDashboardPage(),
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

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardPage);
