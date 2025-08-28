import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Paper,
    useTheme,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AssistantIcon from '@mui/icons-material/Assistant';
import { useDispatch, useSelector } from 'react-redux';
import { setMockServerToggle } from '../redux/uiSlice';

interface PromptInputProps {
    onSend: (prompt: string, files?: File[], mockServerToggle?: string) => void;
    displayHelp: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend, displayHelp }) => {
    const [prompt, setPrompt] = useState('');
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const theme = useTheme();
    const dispatch = useDispatch();
    const mockServerToggle = useSelector((state: any) => state.ui.mockServerToggle);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).filter(file =>
                file.name.endsWith('.csv') || file.name.endsWith('.pdf')
            );
            setAttachedFiles(prev =>
                [...prev, ...newFiles].filter(
                    (file, idx, arr) => arr.findIndex(f => f.name === file.name) === idx
                )
            );
            if (inputFileRef.current) inputFileRef.current.value = '';
        }
    };

    const handleAttachClick = () => {
        inputFileRef.current?.click();
    };

    const handleSend = () => {
        if (attachedFiles) {
            if (!prompt.trim() && attachedFiles.length === 0) return;

            onSend(prompt.trim(), attachedFiles.length > 0 ? attachedFiles : undefined, mockServerToggle);
            setPrompt('');
            setAttachedFiles([]);
        }
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMockServerToggle(e.target.value));
    };

    useEffect(() => {
        console.log('attachedFiles: ', attachedFiles);
    }, [attachedFiles]);

    return (
        <Paper
            sx={{
                position: 'relative',   
                backgroundColor: 'transparent',
                border: 'none',
                maxWidth: 1000,
                width: '100%',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                handleSend();
            }}
        >
            <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Box
                    sx={{
                        display: displayHelp ? 'block' : 'none',
                        py: 4,

                    }}>
                    <AssistantIcon fontSize='large' color='info' />
                    <Typography color='textSecondary' variant="h5" gutterBottom>
                        Hi There! How can I help you today?
                    </Typography>
                    <Typography color='textSecondary' variant="body2" gutterBottom>
                        You can ask me questions about financial reports, upload documents, or seek insights on financial data.
                    </Typography>
                </Box>
                <FormControl sx={{ mb: 2, backgroundColor: 'transparent' }}>
                    <Typography variant="body2" gutterBottom> Select mock scenario </Typography>
                    <RadioGroup
                        row
                        value={mockServerToggle}
                        onChange={handleRadioChange}

                    >
                        <FormControlLabel value="success" control={<Radio />} label="success" />
                        <FormControlLabel value="csvFailed" control={<Radio />} label="csvFailed" />
                        <FormControlLabel value="unstructuredFailed" control={<Radio />} label="unstructuredFailed" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    multiline
                    minRows={2}
                    maxRows={6}
                    placeholder="Enter your prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <Box
                    sx={{
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <IconButton onClick={handleAttachClick} aria-label="attach file">
                        <AttachFileIcon />
                    </IconButton>
                    <input
                        type="file"
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        multiple
                        accept=".csv,.pdf"
                    />
                    <Box sx={{ ml: 2, flexGrow: 1, fontSize: 14, color: theme.palette.text.secondary }}>
                        {attachedFiles.length > 0
                            ? (
                                <Box sx={{ mt: 1, width: '100%' }}>
                                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                                        {attachedFiles.map((file, idx) => (
                                            <li key={idx} style={{ fontSize: 13, listStyle: 'none', color: theme.palette.text.secondary }}>
                                                {file.name} <i>x</i>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            )
                            : 'No files attached'}
                    </Box>
                    <Box
                        component="button"
                        type="submit"
                        sx={{
                            ml: 2,
                            px: 2,
                            py: 1,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            border: 'none',
                            borderRadius: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        Send
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default PromptInput;
