import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

type ChatMessage = {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    fileName?: string;
};

interface ChatHistoryProps {
    messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
    const theme = useTheme();
    const scrollRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages]);

    return (
        <Box
            ref={scrollRef}
            sx={{
                flexGrow: 1,
                height: 0,
                minHeight: 0,
                overflowY: 'auto',
                width: '100%',
                mb: 2,
                px: 10,

                '&::-webkit-scrollbar': {
                    width: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[300],
                    borderRadius: 4,
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: `${theme.palette.grey[400]} transparent`,
            }}

        >
            
            {messages.map(({ id, sender, text, fileName }) => {
                const isUser = sender === 'user';
                return (
                    <Box
                        key={id}
                        sx={{
                            display: 'flex',
                            justifyContent: isUser ? 'flex-end' : 'flex-start',
                            mb: 1,
                        }}
                    >
                        <Paper
                            elevation={1}
                            sx={{
                                maxWidth: '70%',
                                p: 1.5,
                                backgroundColor: isUser
                                    ? theme.palette.primary.main
                                    : theme.palette.grey[400],
                                color: isUser ? theme.palette.primary.contrastText : 'inherit',
                                borderRadius: 2,
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            <Typography variant="body1">{text}</Typography>
                            {fileName && (
                                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                                    📎 {fileName}
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                );
            })}
            <div ref={endRef} />
        </Box>
    );
};

export default ChatHistory;
