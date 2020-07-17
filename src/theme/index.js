import { createMuiTheme } from '@material-ui/core/styles';

const canela = {
  fontFamily: 'Canela',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
  local('Canela'),
  url('../../public/fonts/Canela-Regular.otf')
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
    background: {
      paper: '#343638',
      default: '#131415',
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
      color: '#7D7D7D',
    },
    subtitle2: {
      fontFamily: 'Arial',
      fontSize: '1.125rem',
      color: '#7D7D7D',
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
