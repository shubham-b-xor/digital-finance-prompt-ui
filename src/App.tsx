import React from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { getTheme } from './theme';
import { useAppSelector } from './redux/hooks';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Home from './pages/Home';
import History from './pages/History';
import MasterConfiguration from './pages/MasterConfiguration';
import FileUpload from './pages/FileUpload';

const App: React.FC = () => {
  const darkMode = useAppSelector((state) => state.ui.darkMode);
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
                m: 2,
                p: 1,
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                minHeight: 0,
                backgroundColor: 'transparent'
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/history"
                  element={<History />}
                />
                <Route
                  path="/master-configuration"
                  element={<MasterConfiguration />}
                />
                <Route
                  path="/file-upload"
                  element={<FileUpload />}
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
