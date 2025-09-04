import React from 'react';
import {
    Box,
    Divider,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setChunkSize,
    setChunkOverlap,
    setBatchSize,
    setEnableOCR,
    setEnableSummarization,
} from '../redux/masterConfigSlice';
import { RootState, AppDispatch } from '../redux/store';

const FileProcessingSettings: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        chunkSize,
        chunkOverlap,
        batchSize,
        enableOCR,
        enableSummarization,
    } = useSelector((state: RootState) => state.masterConfig);

    return (
        <Box p={4}>
            <Typography variant="h5" gutterBottom>
                File Processing Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Configure how files are processed and chunked
            </Typography>

            <Grid container spacing={2} mb={2}>
                <Grid component={'div'} size={6}>
                    <TextField
                        fullWidth
                        label="Chunk Size"
                        type="number"
                        value={chunkSize}
                        onChange={(e) => dispatch(setChunkSize(Number(e.target.value)))}
                        helperText="Size of text chunks for processing"
                    />
                </Grid>
                <Grid component={'div'} size={6}>
                    <TextField
                        fullWidth
                        label="Chunk Overlap"
                        type="number"
                        value={chunkOverlap}
                        onChange={(e) => dispatch(setChunkOverlap(Number(e.target.value)))}
                        helperText="Overlap between consecutive chunks"
                    />
                </Grid>
            </Grid>

            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Batch Size"
                    type="number"
                    value={batchSize}
                    onChange={(e) => dispatch(setBatchSize(Number(e.target.value)))}
                    helperText="Number of files processed simultaneously"
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
                Processing Options
            </Typography>

            <Box mb={2}>
                <Box display="flex" flexDirection="column">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={enableOCR}
                                onChange={(e) => dispatch(setEnableOCR(e.target.checked))}
                            />
                        }
                        label="Enable OCR"
                    />
                    <Typography variant="caption" color="text.secondary" ml={7}>
                        Extract text from images and scanned documents
                    </Typography>
                </Box>
            </Box>

            <Box mb={2}>
                <Box display="flex" flexDirection="column">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={enableSummarization}
                                onChange={(e) => dispatch(setEnableSummarization(e.target.checked))}
                            />
                        }
                        label="Enable Summarization"
                    />
                    <Typography variant="caption" color="text.secondary" ml={7}>
                        Generate summaries for large documents
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default FileProcessingSettings;
