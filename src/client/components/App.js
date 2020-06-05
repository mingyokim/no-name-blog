import React from 'react';
import { renderRoutes } from 'react-router-config';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import routes from '../../routes';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#131415',
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderRoutes(routes)}
    </ThemeProvider>
  );
}
