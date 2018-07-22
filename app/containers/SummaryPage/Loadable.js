/**
 *
 * Asynchronously loads the component for SummaryPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
