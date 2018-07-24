import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Textarea from 'components/Textarea';

import { Grid, Typography, Button, ListItem, List, Divider, ListItemText } from '@material-ui/core';

import Page from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectOrder } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const Section = styled.div`
  margin: 0 0 2rem;
  width: 100%;
`;

const SytledListHeader = styled(ListItem)`
  background: #f5f5f5;
`;

const ButtonContainer = styled.div`
  >button {
    margin: 0px 20px;
  }
`;

function generate(element) {
  return [0, 1, 2,3].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

/* eslint-disable react/prefer-stateless-function */
export class SummaryPage extends React.Component {
  state = { regimenName: "CHOP Protocol for Non Hodking Lymphome", cycleInfo: "Every 3 weeks of 6 cycles" };

  render() {
    const { order } = this.props;

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
                <FormattedMessage
                  id='app.containers.SummaryPage.regimen'
                  defaultMessage={this.state.regimenName} />
              </Typography>
      
              <Typography variant="subheading" gutterBottom>
                <FormattedMessage
                  id='app.containers.SummaryPage.regimen'
                  defaultMessage={this.state.cycleInfo} />
              </Typography>
            </Grid>

            <Section>
              <Grid container spacing={16}>

                <Grid item xs={4}>
                  <List>
                    <SytledListHeader>
                      <ListItemText primary="PREMEDICATIONS" />
                    </SytledListHeader>
                    {order &&
                      generate(
                        <div>
                          <ListItem>
                            <ListItemText
                              primary='Dexamethasone'
                              secondary='Once prior to chemotherapy'
                            />
                          </ListItem>
                          <Divider/>
                        </div>
                      )
                    }
                  </List>  
                </Grid>
                <Grid item xs={4}>
                  <List>
                    <SytledListHeader>
                      <ListItemText primary="PREMEDICATIONS" />
                    </SytledListHeader>
                    {order &&
                      generate(
                        <div>
                          <ListItem>
                            <ListItemText
                              primary='Doxorubicin'
                              secondary='IV Push over 15 mins'
                            />
                          </ListItem>
                          <Divider/>
                        </div>
                      )
                    }
                  </List>  
                </Grid>
                <Grid item xs={4}>
                  <List>
                    <SytledListHeader>
                      <ListItemText primary="POSTMEDICATION" />
                    </SytledListHeader>
                    {order &&
                      generate(
                        <div>
                          <ListItem>
                            <ListItemText
                              primary='Aspirin'
                              secondary='1 time per day'
                            />
                          </ListItem>
                          <Divider/>
                        </div>
                      )
                    }
                  </List>  
                </Grid>

              </Grid>
            </Section>

            <Section>
              <Grid item xs={12}>
                <Typography variant="subheading" gutterBottom>
                  <FormattedMessage {...messages.notes} />
                </Typography>
                <Textarea
                  rows="3"
                  disabled
                  multiid="medication"
                  type="text"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor mi nec suscipit mattis. Mauris ut laoreet ex. Duis varius, enim sit amet dapibus molestie, metus arcu elementum sapien"
                  fullWidth
                />
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
                          history.push('/order');
                        }}
                      >
                        <FormattedMessage {...messages.back} />
                      </Button>
                    )}
                  />

                  <Button
                    variant="contained"
                    onClick={() => {

                    }}
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
  dispatch: PropTypes.func.isRequired,
  order: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  order: makeSelectOrder(),
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
