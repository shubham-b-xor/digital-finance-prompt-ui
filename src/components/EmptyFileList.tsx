import React from 'react';
import { Box, Typography } from '@mui/material';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';


const EmptyFileList: React.FC = () => {
    console.log('Rendering EmptyFileList component');
    return (
        <Box
            sx={{
                alignItems: 'center',
                textAlign: 'center',
                mt: 4,
            }}

        >
            <InsertDriveFileRoundedIcon color='disabled' fontSize='large' />
            <Typography color='textSecondary' variant="h6" gutterBottom>
                No Files Uploaded Yet
            </Typography>
        </Box>
    );
};

export default EmptyFileList;
