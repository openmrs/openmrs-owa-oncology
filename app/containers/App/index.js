/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OrderPage from 'containers/OrderPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import NurseDashboardPage from 'containers/NurseDashboardPage/Loadable';
import DoctorDashboardPage from 'containers/DoctorDashboardPage/Loadable';
import ChemotherapyPage from 'containers/ChemotherapyPage/Loadable';
import SummaryPage from 'containers/SummaryPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'containers/Header';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#734a63',
      main: '#501D3D',
      dark: '#38142a',
      contrastText: '#fff',
    },
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Header/>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/nurseDashboard" component={NurseDashboardPage} />
        <Route exact path="/physicianDashboard" component={DoctorDashboardPage} />
        <Route path="/chemotherapy/:cycleUuid?" component={ChemotherapyPage} />
        <Route exact path="/order/:template?" component={OrderPage} />
        <Route exact path="/order/:template/summary" component={SummaryPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </MuiThemeProvider>
  );
}
