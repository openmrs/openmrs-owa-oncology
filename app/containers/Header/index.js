/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser, faCaretDown, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectCurrentSession} from './selectors';
import reducer from './reducers';
import saga from './saga';
// import messages from './messages';

import { fetchCurrentSessionAction, fetchEncounterRoleAction, fetchEncounterTypeAction } from './actions';

import logoImg from './resources/openmrs-with-title-small.png';

const Logo = styled.img`
  width: 120px;
`;

const Navigation = styled.div`
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
    this.props.loadCurrentSession();
    this.props.loadEncounterRole();
    this.props.loadEncounterType();
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static" color="secondary">
        <Toolbar style={{ justifyContent: 'space-between' }}>
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
