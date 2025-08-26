import React from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { getTheme } from './theme';
import { useAppSelector } from './redux/hooks';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Home from './pages/Home';

const App: React.FC = () => {
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const messages = useAppSelector((state) => state.chat.messages);
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" height="100vh">
          <TopBar />
          <Box display="flex" flex={1}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 2,
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: messages.length === 0 ? 'center' : 'flex-end',
                alignItems: 'center',
                minHeight: 0,
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/digital-finance-prompt-ui" element={<Home />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
