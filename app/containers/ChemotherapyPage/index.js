/**
 *
 * ChemotherapyPage
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

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import NaviList from 'components/NaviList';
import { Sidebar, Content } from 'components/Page';
import MedicationTable from 'components/MedicationTable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectChemotherapyPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const SidebarTitle = styled.div`
  padding: 1em 1em 0.5em;
`;
const Head = styled.div`
  overflow: hidden;
  margin-bottom: 1em;
`;
const HeadActions = styled.div`
  float: right;
`;

/* eslint-disable react/prefer-stateless-function */
export class ChemotherapyPage extends React.Component {
  render() {
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
              items={[
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
              ]}
            />
          </Sidebar>
          <Content>
            <Head>
              <HeadActions>
                <Button variant="contained" color="primary">
                  Administrate
                </Button>
                &nbsp;&nbsp;
                <Button variant="outlined">
                  Modify order
                </Button>
              </HeadActions>
              <Typography variant="headline">
                CHOP: Protocol for Non Hodgkin Lymphome
              </Typography>
              <Typography variant="subheading">
                Cycle 3 of 6
              </Typography>
            </Head>
            <MedicationTable
              readOnly
              name="Premedications"
              medications={[{
                drug: {
                  name: '0.9% Normal',
                },
                dosingInstructions: {
                  dose: 1000,
                  doseUnits: 'mg',
                  route: 'Oral',
                },
                administrationInstructions: 'Once 1 hour prior to chemotherapy',
              }]}
            />
            <MedicationTable
              readOnly
              name="Chemotherapy"
              medications={[{
                drug: {
                  name: '0.9% Normal',
                },
                dosingInstructions: {
                  dose: 1000,
                  doseUnits: 'mg',
                  route: 'Oral',
                },
                administrationInstructions: 'Once 1 hour prior to chemotherapy',
              }]}
            />
            <Typography variant="subheading">
              Cycle summary
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore e
            </Typography>
          </Content>
        </div>
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
