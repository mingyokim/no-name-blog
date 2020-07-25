import { createMuiTheme } from '@material-ui/core/styles';

const canela = {
  fontFamily: 'Canela',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
  local('Canela'),
  url('/public/Canela-Regular.otf')
`,
};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#a6d4fa',
      main: '#90caf9',
      dark: '#648dae',
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      dark: '#aa647b',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    background: {
      paper: '#343638',
      default: '#131415',
    },
    text: {
      secondary: '#7D7D7D',
    }
  },
  typography: {
    h1: {
      fontFamily: 'Canela',
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: 'Canela',
      fontSize: '1.75rem',
    },
    h3: {
      fontFamily: 'Arial',
      fontSize: '1.5rem',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    h4: {
      fontFamily: 'Arial',
      fontSize: '1.125rem',
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: 'Arial',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    h6: {
      fontFamily: 'Arial',
      fontSize: '0.875rem',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: 'Arial',
      fontSize: '1.125rem',
    },
    subtitle1: {
      fontFamily: 'Arial',
      fontSize: '1.125rem',
      fontStyle: 'italic',
    },
    subtitle2: {
      fontFamily: 'Arial',
      fontSize: '1.125rem',
    },
    overline: {
      fontWeight: 'bold',
      fontFamily: 'Arial',
      fontSize: '0.875rem'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [canela],
      }
    }
  }
});

export default theme;
