/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectCurrentSession } from './selectors';
import reducer from './reducers';
import saga from './saga';
// import messages from './messages';

import { fetchCurrentSessionAction, fetchEncounterRoleAction, fetchEncounterTypeAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {

  componentDidMount() {
    this.props.loadCurrentSession();
    this.props.loadEncounterRole();
    this.props.loadEncounterType();
  }

  render() {
    return (
      <div>
        {/* <Helmet>
          <title>Header</title>
          <meta name="description" content="Description of Header" />
        </Helmet>
        <FormattedMessage {...messages.header} /> */}
      </div>
    );
  }
}

Header.propTypes = {
  loadCurrentSession: PropTypes.func.isRequired,
  loadEncounterRole: PropTypes.func.isRequired,
  loadEncounterType: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentSession: makeSelectCurrentSession(),
  // currentSession: makeSelectDefaultEncounterRole(),
  // currentSession: makeSelectDefaultEncounterType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadCurrentSession: () => dispatch(fetchCurrentSessionAction()),
    loadEncounterRole: () => dispatch(fetchEncounterRoleAction()),
    loadEncounterType: () => dispatch(fetchEncounterTypeAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
