import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, Box, Toolbar } from '@mui/material';
import { getTheme } from './theme';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import PromptInput from './components/PromptInput';
import ChatHistory from './components/ChatHistory';
import { v4 as uuidv4 } from 'uuid';
import { addMessage } from './redux/chatSlice';

const drawerWidth = 240;

type ChatMessage = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  fileName?: string;
};

const App: React.FC = () => {
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const messages = useAppSelector((state) => state.chat.messages); // <-- use Redux messages
  const dispatch = useAppDispatch();
  const theme = getTheme(darkMode ? 'dark' : 'light');

  const handleSend = (prompt: string, file?: File) => {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      text: prompt,
      fileName: file?.name,
    };

    dispatch(addMessage(userMessage)); // <-- dispatch to Redux

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        text: userMessage.fileName?
        `Domain: Investment Portfolio
Section: Asset Allocation
🔎 Analyzed Insights:
Portfolio diversification improved; no single asset class exceeds 35% of total investment.
Equity exposure increased from 45% to 52%, driven by strong market performance.
Bond holdings were reduced by 10%, indicating a risk-on shift.
New entries in alternative investments (e.g., REITs, crypto) account for 6% of total holdings.`
        :`You said: "${prompt}"`,
      };
      dispatch(addMessage(botMessage)); // <-- dispatch to Redux
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
            {/* <Toolbar /> */}
            {messages.length === 0 ? (
              <PromptInput displayHelp={true} onSend={handleSend} />
            ) : (
              <>
                <ChatHistory messages={messages} />
                <PromptInput displayHelp={false} onSend={handleSend} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
