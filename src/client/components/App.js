import React from 'react';
import { renderRoutes } from 'react-router-config';
import CssBaseline from '@material-ui/core/CssBaseline';

import routes from '../../routes';

const App = () => (
  <>
    <CssBaseline />
    {renderRoutes(routes)}
  </>
);

export default App;
