import { Box, Paper, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { ChatMessage } from "../../types";

interface UserMessageProps {
    message: ChatMessage
}

const UserMessage: FC<UserMessageProps> = ({ message }) => {
    const theme = useTheme();
    return (
        <Box
            key={message.id}
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 1,
                whiteSpace: 'pre-wrap',
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    maxWidth: '70%',
                    p: 1.5,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: 2,
                    whiteSpace: 'pre-wrap',
                }}
            >
                <Typography variant="body1">{message.message}</Typography>
                {message.fileName && (
                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        📎 {message.fileName}
                    </Typography>
                )}
            </Paper>
        </Box>
    )
}

export default UserMessage;
