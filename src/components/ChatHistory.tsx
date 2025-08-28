import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { ChatMessage } from '../types';
import Result from './output/Result';

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
                maxWidth: 1000,
                width: '100%',

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
            {messages.map((message) => {
                return (
                    <Result message={message} />
                );
            })}
        </Box>
    );
};

export default ChatHistory;
