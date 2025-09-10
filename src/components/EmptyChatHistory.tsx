import React from 'react';
import { Box, Typography } from '@mui/material';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import AssistantIcon from '@mui/icons-material/Assistant';


const EmptyChatHistory: React.FC = () => {

    return (
        <Box
            sx={{
                flexGrow: 1,
                height: 0,
                minHeight: 0,
                overflowY: 'auto',
                maxWidth: 1000,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}

        >
            <SmartToyRoundedIcon color='disabled' fontSize='large' />
            <Typography color='textSecondary' variant="h6" gutterBottom>
                What's on your mind?
            </Typography>
            <Typography color='textSecondary' variant="body1" gutterBottom>
                Type your question to get started!
            </Typography>
        </Box>
    );
};

export default EmptyChatHistory;
