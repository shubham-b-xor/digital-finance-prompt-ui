import { Box, Chip, Paper, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { ChatMessage } from "../../types";

interface DocResultProps {
    message: ChatMessage
}

const DocResult: FC<DocResultProps> = ({ message }) => {
    const theme = useTheme();
    return (
        <Box
            key={message.id}
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 1,
                whiteSpace: 'pre-wrap',
            }}
        >
            <Paper
                elevation={1}
                sx={{
                    maxWidth: '70%',
                    p: 1.5,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.primary.dark,
                    borderRadius: 2,
                    borderTop: message.errorCode > 0 ? `4px solid ${theme.palette.error.light}` : `4px solid ${theme.palette.success.light}`,
                    whiteSpace: 'pre-wrap',
                }}
            >
                <Typography variant="body1">{message.message}</Typography>
                {(message.errorCode && message.erroredProperties.length > 0) && <>
                    <Typography variant="caption">{`\nThese columns are causing error:`}</Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {message.erroredProperties.map((column) => (
                            <Chip key={column} label={column} color="primary" />
                        ))}
                    </Box>
                </>}
            </Paper>
        </Box>
    )
}

export default DocResult;
