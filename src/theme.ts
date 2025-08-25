import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#00338D' }, 
      ...(mode === 'light'
        ? {
            background: {
              default: '#f5f5f5',
              paper: '#fff',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
  });