import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#82b9fd',
        contrastText: '#000',
      },
      secondary: {
        main: '#ff9800',
      },
      ...(mode === 'light'
        ? {
          background: {
            default: '#cacacaff',
            paper: '#eeededff',
          },
          text: {
            primary: '#000',
            secondary: '#555',
          },
          info: {
            main: '#64b5f6',
          },
          success: {
            main: '#4caf50',
          },
          warning: {
            main: '#ffb74d',
          },
          error: {
            main: '#f44336',
          },
        }
        : {
          background: {
            default: '#030711',
            paper: '#0a0f1f',
          },
          text: {
            primary: '#fff',
            secondary: '#aaa',
          },
          info: {
            main: '#64b5f6',
          },
          success: {
            main: '#4caf50',
          },
          warning: {
            main: '#ffb74d',
          },
          error: {
            main: '#f44336',
          },
        }),
    },
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: '0.875rem',
          },
          secondary: {
            fontSize: '0.75rem',
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 32,
            '& svg': {
              fontSize: '0.875rem',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            paddingTop: 5,
            paddingBottom: 5,
            minHeight: 50,
            backgroundColor: '#030711'
          },
        },
      },
    },
  });
