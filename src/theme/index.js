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
      fontSize: '2rem',
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
