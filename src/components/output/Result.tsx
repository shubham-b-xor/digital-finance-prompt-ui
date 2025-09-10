import { ChatMessage } from "../../types";
import UserMessage from "./UserMessage";
import React from "react";
import CSVResult from "./CsvResult";
import DocResult from "./DocResult";
import { CircularProgress, Paper, Stack, Typography, useTheme } from "@mui/material";

interface ResultProps {
    message: ChatMessage
}

const Result: React.FC<ResultProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    const theme = useTheme()
    console.log('Rendering message: ', message);
    console.log('Rendering message: ', message.type);
    return (
        <>
            {isUser ? <UserMessage message={message} />
                : (<>
                    {message.type === 'text/csv' && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <CSVResult message={message} />
                        </React.Suspense>
                    )}

                    {message.type === 'loading' && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Paper elevation={1} sx={{
                                width: 'fit-content',
                                maxWidth: '70%',
                                p: 2,
                                mb: 1,
                                borderRadius: 2,
                                backgroundColor: theme.palette.background.paper,
                                borderTop: `4px solid ${theme.palette.info.light}`
                            }}>
                                <Stack spacing={2} direction="row" alignItems="center">
                                    <CircularProgress size="2rem" />
                                    <Typography color='textSecondary' variant="body2">
                                        {message.message}
                                    </Typography>
                                </Stack>
                            </Paper>
                        </React.Suspense>
                    )}

                    {message.type === 'application/pdf' && (
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <DocResult message={message} />
                        </React.Suspense>
                    )}
                </>)}
        </>
    );
}

export default Result;
