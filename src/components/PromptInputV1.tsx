import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Paper,
    useTheme,
    Typography,
    Chip,
    Button,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useSelector } from 'react-redux';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setIsFileUploaded, setPrompt, toggleIsFileUploaded } from '../redux/uiSlice';
import { addFiles, removeFile } from '../redux/fileUploadSlice';

interface PromptInputProps {
    onSend: (prompt: string, files?: File[], mockServerToggle?: string) => void;
    displayHelp: boolean;
}

const PromptInputV1: React.FC<PromptInputProps> = ({ onSend }) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const theme = useTheme();
    const mockServerToggle = useSelector((state: any) => state.ui.mockServerToggle);
    const prompt = useSelector((state: any) => state.ui.prompt);
    const uploadedFiles = useSelector((state: any) => state.fileUpload.uploadedFiles);
    const awaitingResponse = useSelector((state: any) => state.ui.awaitingResponse);
    const dispatch = useDispatch<AppDispatch>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            dispatch(toggleIsFileUploaded());
            dispatch(addFiles(Array.from(e.target.files!)));
            if (inputFileRef.current) inputFileRef.current.value = '';
        }
    };

    const handleAttachClick = () => {
        inputFileRef.current?.click();
    };

    const handleSend = () => {
        if (!prompt.trim() && uploadedFiles.length === 0) return;
        else if (prompt.trim() && uploadedFiles.length > 0) {
            onSend(prompt.trim(), uploadedFiles.length > 0 ? uploadedFiles : undefined, mockServerToggle);
            dispatch(setPrompt(''));
            dispatch(setIsFileUploaded(false));
        }
        else if (prompt.trim() && uploadedFiles.length === 0) {
            onSend(prompt.trim(), undefined, mockServerToggle);
            dispatch(setPrompt(''));
        }
    };


    useEffect(() => {
        console.log('uploadedFiles: ', uploadedFiles);
        console.log('awaiting: ', awaitingResponse);
    }, [uploadedFiles, awaitingResponse]);

    return (
        <Paper
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                handleSend();
            }}
            sx={{
                position: 'relative',
                maxWidth: 1000,
                width: '100%',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Box>
                <TextField
                    multiline
                    minRows={2}
                    maxRows={6}
                    disabled={awaitingResponse}
                    placeholder={awaitingResponse ? "Wait for response..." : "Enter your prompt..."}
                    value={prompt}
                    onChange={(e) => dispatch(setPrompt(e.target.value))}
                    variant="outlined"
                    fullWidth
                    sx={{
                        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'background.paper',
                        mb: 1,
                    }}
                    InputProps={{
                        sx: {
                            color: theme.palette.text.primary,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    <IconButton onClick={handleAttachClick} aria-label="attach file" color="primary">
                        <AttachFileIcon />
                    </IconButton>
                    <input
                        type="file"
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        multiple
                        accept=".csv,.pdf,.doc,.docx"
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            fontSize: 14,
                            color: theme.palette.text.secondary,
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.5,
                        }}
                    >
                        {uploadedFiles.length > 0 ? (
                            uploadedFiles.map((file: any, idx: number) => (
                                <Chip
                                    key={file.name + idx}
                                    sx={{ maxWidth: '10rem' }}
                                    variant="filled"
                                    label={file.name}
                                    onDelete={() => {
                                        dispatch(removeFile(file.id));
                                    }}
                                />
                            ))
                        ) : (
                            <Typography color="textSecondary">No files attached</Typography>
                        )}
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={awaitingResponse || !prompt.trim()}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        <SendRoundedIcon />
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default PromptInputV1;
