import React from 'react';
import { Box, Typography } from '@mui/material';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';


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
                Start Chatting
            </Typography>
            <Typography color='textSecondary' variant="body1" gutterBottom>
                Ask questions to see results
            </Typography>
        </Box>
    );
};

export default EmptyChatHistory;
