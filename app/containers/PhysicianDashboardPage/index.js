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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faStethoscope, faFileMedical, faVial  } from '@fortawesome/free-solid-svg-icons'

import DashboardCard from 'components/DashboardCard';
import Page from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import history from '../../history' 


// const ListWrapper = styled.div`
//   margin-bottom: 1em;
// `;


const ListKey = styled.div`
  width: 160px;
  float: left;
`;

const StyledPage = styled(Page) `
  max-width: 100%;
`

const ListValue = styled.div`
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer;
`;

const ActionNav = styled.div`
  >ul {
    padding: 14px;
  }
  background: #003653;
  color: white;
  margin: 1em;
`

const StyledActionHeader = styled.div`
  border-bottom: 1px white solid;
`

/* eslint-disable react/prefer-stateless-function */
export class DashboardPage extends React.Component {
  gotoToAdministerChemo() {

  }

  gotoToOrderChemo(){

  }
  render() {
    return (
      <StyledPage>
        <Helmet>
          <title>Physicican DashboardPage</title>
          <meta name="description" content="Description of Physicican DashboardPage" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <br/>
        <br/>
        <Grid container spacing={16}>
          <Grid item xs={8}>
            <DashboardCard
              title="REGIMEN"
              footer={
                <Button
                  component={Link}
                  color="primary"
                  variant="contained"
                  to="/order"
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

          <Grid item xs={4}>
            <ActionNav>
              <List>
                <StyledActionHeader divider>
                  <FormattedMessage {...messages.header1} />
                </StyledActionHeader>
                <StyledListItem
                  onClick={() => {
                    history.push(`/chemotherapy`);
                  }}>
                  <StyledFontAwesomeIcon icon={faHeartbeat} />
                  <FormattedMessage {...messages.administerChemo} />
                </StyledListItem>
                <ListItem>
                  <StyledFontAwesomeIcon icon={faStethoscope} />
                  <FormattedMessage {...messages.takeVitals} />
                </ListItem>
                <ListItem>
                  <StyledFontAwesomeIcon icon={faFileMedical} />
                  <FormattedMessage {...messages.oncConsult} />
                </ListItem>
                <StyledActionHeader divider>
                  <FormattedMessage {...messages.header2} />
                </StyledActionHeader>
                <StyledListItem
                  onClick={() => {
                    history.push(`/order`);
                  }}>
                  <StyledFontAwesomeIcon icon={faVial} />
                  <FormattedMessage {...messages.orderChemo} />
                </StyledListItem>
              </List>
            </ActionNav>
          </Grid>
        </Grid>
      </StyledPage>
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
