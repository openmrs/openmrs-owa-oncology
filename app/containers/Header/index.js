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
import {makeSelectCurrentSession, makeSelectEncounterRole, makeSelectEncounterType} from './selectors';
import reducer from './reducers';
import saga from './saga';
// import messages from './messages';

import { fetchCurrentSession, fetchEncounterRole, fetchEncounterType } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {

  componentDidMount() {
    this.props.loadCurrentSession();
    // this.props.loadDefaultEncounterRole();
    // this.props.loadDefaultEncounterType();
    this.props.loadEncounterRole();
    this.props.loadEncounterType();
  }

  render() {
    const {
      currentSession,
      // defaultEncounterRole,
      // defaultEncounterType,
      encounterRole,
      encounterType,
    } = this.props;

    console.log(currentSession);
    // console.log(defaultEncounterRole);
    // console.log(defaultEncounterType);
    console.log(encounterRole);
    console.log(encounterType);

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
  currentSession: PropTypes.object,
  // defaultEncounterRole: PropTypes.object,
  // defaultEncounterType: PropTypes.object,
  encounterRole: PropTypes.object,
  encounterType: PropTypes.object,
  loadCurrentSession: PropTypes.func.isRequired,
  // loadDefaultEncounterRole: PropTypes.func.isRequired,
  // loadDefaultEncounterType: PropTypes.func.isRequired,
  loadEncounterRole: PropTypes.func.isRequired,
  loadEncounterType: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentSession: makeSelectCurrentSession(),
  // defaultEncounterRole: makeSelectDefaultEncounterRole(),
  // defaultEncounterType: makeSelectDefaultEncounterType(),
  encounterRole: makeSelectEncounterRole(),
  encounterType: makeSelectEncounterType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadCurrentSession: () => dispatch(fetchCurrentSession()),
    // loadDefaultEncounterRole: () => dispatch(fetchDefaultEncounterRole()),
    // loadDefaultEncounterType: () => dispatch(fetchDefaultEncounterType()),
    loadEncounterRole: () => dispatch(fetchEncounterRole()),
    loadEncounterType: () => dispatch(fetchEncounterType()),
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
