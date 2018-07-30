/**
 *
 * ChemotherapyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Typography from '@material-ui/core/Typography';

import NaviList from 'components/NaviList';
import { Sidebar, Content } from 'components/Page';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectObservations } from './selectors';
import { loadObservations, createObservation } from './actions';

import Main from './components/Main';
import AdministrateForm from './components/AdministrateForm';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const SidebarTitle = styled.div`
  padding: 1em 1em 0.5em;
`;

const regimens = [
  {
    id: 1,
    title: 'CHOP Protocol for Non Hodgkin Lymphome',
    status: 'active',
    children: [
      {
        id: 11,
        cycle: 3,
        title: 'Cycle 3 of 6',
        date: '08/01/18',
        status: 'active',
      }, {
        id: 12,
        cycle: 2,
        title: 'Cycle 2 of 6',
        date: '08/01/18',
        status: 'completed',
      }, {
        id: 13,
        cycle: 1,
        title: 'Cycle 1 of 6',
        date: '08/01/18',
        status: 'completed',
      },
    ],
  }, {
    id: 2,
    title: 'CHOP Protocol for Non Hodgkin Lymphome',
    status: 'completed',
    children: [
      {
        id: 21,
        cycle: 6,
        title: 'Cycle 6 of 6',
        date: '08/01/18',
        status: 'completed',
      }, {
        id: 22,
        cycle: 5,
        title: 'Cycle 5 of 6',
        date: '08/01/18',
        status: 'completed',
      }, {
        id: 23,
        cycle: 4,
        title: 'Cycle 4 of 6',
        date: '08/01/18',
        status: 'completed',
      }, {
        id: 24,
        cycle: 3,
        title: 'Cycle 3 of 6',
        date: '08/01/18',
        status: 'completed',
      }, {
        id: 25,
        cycle: 2,
        title: 'Cycle 2 of 6',
        date: '08/01/18',
        status: 'completed',
      }, {
        id: 26,
        cycle: 1,
        title: 'Cycle 1 of 6',
        date: '08/01/18',
        status: 'completed',
      },
    ],
  },
];

/* eslint-disable react/prefer-stateless-function */
export class ChemotherapyPage extends React.Component {

  componentDidMount() {
    this.props.loadObservations({
      v: 'default',
      q: 'dave',
      limit: 10,
    });
  }

  render() {
    console.log(this.props.observations);

    return (
      <div>
        <Helmet>
          <title>ChemotherapyPage</title>
          <meta name="description" content="Description of ChemotherapyPage" />
        </Helmet>
        <div>
          <Sidebar>
            <SidebarTitle>
              <Typography variant="title">
                <FormattedMessage {...messages.header} />
              </Typography>
            </SidebarTitle>
            <NaviList
              items={regimens}
            />
          </Sidebar>
          <Content>
            <Switch>
              <Route exact path="/chemotherapy" component={Main} />
              <Route exact path="/chemotherapy/administrate" component={AdministrateForm} />
            </Switch>
          </Content>
        </div>
      </div>
    );
  }
}

ChemotherapyPage.propTypes = {
  loadObservations: PropTypes.func.isRequired,
  observations: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  observations: makeSelectObservations(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadObservations: (params) => dispatch(loadObservations(params)),
    createObservation: (observation) => dispatch(createObservation(observation)),
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
