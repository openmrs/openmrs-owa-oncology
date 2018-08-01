/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import dateFns from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt, faUser, faCaretDown, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import Breadcrumb from 'components/Breadcrumb';
import PatientCard from 'components/PatientCard';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getParam } from 'utils/helpers';
import {
  makeSelectCurrentSession,
  makeSelectEncounters,
  makeSelectPatient,
} from './selectors';
import reducer from './reducers';
import saga from './saga';
// import messages from './messages';

import {
  fetchCurrentSessionAction,
  fetchEncounterRoleAction,
  fetchEncounterTypeAction,
  fetchEncountersAction,
  loadPatient,
  fetchOrderGroupsAction,
} from './actions';

import logoImg from './resources/partners_in_health_logo.png';

const Logo = styled.img`
  width: 120px;
`;

const Navigation = styled.div`
`;

const Wrapper = styled.div`
  padding-top: 48px;
`;

const ButtonText = styled.span`
  display: inline-block;
  text-transform: none;
  margin: 0 0.5rem;
`;

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {

  state = {
    anchorEl: null,
  };

  componentDidMount() {
    const patientUuid = getParam('patientId');
    this.props.loadCurrentSession();
    this.props.loadEncounterRole();
    this.props.loadEncounterType();
    this.props.loadPatient(patientUuid);
    this.props.fetchOrderGroups({
      patient: patientUuid,
      v: 'full',
    });
    this.props.loadEncounters({
      patient: patientUuid,
      s: 'default',
      v: 'full',
    })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { patient } = this.props;

    if (!patient) {
      return(<div></div>);
    }

    const { anchorEl} = this.state;
    const open = Boolean(anchorEl);
    const {givenName, familyName} = patient.person.personName;
    const {age, gender, birthdate} = patient.person;
    const {identifier} = patient.patientIdentifier;
    const genderStr = (gender === 'M') ? 'Male' : 'Female';
    const formattedBirthdate = dateFns.format(new Date(birthdate), 'DD MMM YYYY')

    return (
      <Wrapper>
        <AppBar color="primary">
          <Toolbar variant="dense" position="static" style={{ justifyContent: 'space-between' }}>
            <Logo src={logoImg} alt="openMRS logo"/>
            <Navigation>
              <Button
                color="inherit"
                onClick={this.handleMenu}
              >
                <FontAwesomeIcon icon={faUser} />
                <ButtonText>
                  demo1
                </ButtonText>
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                getContentAnchorEl={null}
              >
                <MenuItem>Account</MenuItem>
              </Menu>
              <Button color="inherit">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <ButtonText>
                  Biwo Resepsyon
                </ButtonText>
                <FontAwesomeIcon icon={faCaretDown} />
              </Button>
              <Button color="inherit">
                <ButtonText>
                  Logout
                </ButtonText>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Button>
            </Navigation>
          </Toolbar>
        </AppBar>
        <Breadcrumb
          items={[
            {
              label: <FontAwesomeIcon icon={faHome} />,
              link: '/',
            }, {
              label: `${familyName}, ${givenName}`,
              link: '/',
            }, {
              label: 'Chemo Orders',
            },
          ]}
        />
        <PatientCard
          patient={{
            firstName: givenName,
            lastName: familyName,
            genderStr,
            age,
            birthdate: formattedBirthdate,
            identifier,
          }}
        />
      </Wrapper>
    );
  }
}

Header.propTypes = {
  loadCurrentSession: PropTypes.func.isRequired,
  loadEncounterRole: PropTypes.func.isRequired,
  loadEncounterType: PropTypes.func.isRequired,
  loadPatient: PropTypes.func.isRequired,
  loadEncounters: PropTypes.func.isRequired,
  fetchOrderGroups: PropTypes.func.isRequired,
  patient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentSession: makeSelectCurrentSession(),
  patient: makeSelectPatient(),
  encounters: makeSelectEncounters(),
  // currentSession: makeSelectDefaultEncounterRole(),
  // currentSession: makeSelectDefaultEncounterType(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadCurrentSession: () => dispatch(fetchCurrentSessionAction()),
    loadEncounterRole: () => dispatch(fetchEncounterRoleAction()),
    loadEncounterType: () => dispatch(fetchEncounterTypeAction()),
    loadEncounters: (params) => dispatch(fetchEncountersAction(params)),
    loadPatient: (patientUuid) => dispatch(loadPatient(patientUuid)),
    fetchOrderGroups: (params) => dispatch(fetchOrderGroupsAction(params)),
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
