/**
 *
 * Asynchronously loads the component for ChemotherapyPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
