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

// import HomePage from 'containers/HomePage/Loadable';
import OrderPage from 'containers/OrderPage/Loadable';
import SummaryPage from 'containers/SummaryPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'containers/Header/Loadable';

export default function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={OrderPage} />
        <Route exact path="/order/:template?" component={OrderPage} />
        <Route exact path="/order/:template/summary" component={SummaryPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
