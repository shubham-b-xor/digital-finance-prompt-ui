import React, { useState, useRef } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Paper,
    useTheme,
    Typography,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AssistantIcon from '@mui/icons-material/Assistant';

interface PromptInputProps {
    onSend: (prompt: string, file?: File) => void;
    displayHelp: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend, displayHelp }) => {
    const [prompt, setPrompt] = useState('');
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const theme = useTheme();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAttachedFile(e.target.files[0]);
        }
    };

    const handleAttachClick = () => {
        inputFileRef.current?.click();
    };

    const handleSend = () => {
        if (!prompt.trim() && !attachedFile) return;

        onSend(prompt.trim(), attachedFile || undefined);
        setPrompt('');
        setAttachedFile(null);
    };

    return (
        <Paper
            sx={{
                p: 1,
                position: 'relative',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 750,
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
                />
                <Box sx={{ ml: 2, flexGrow: 1, fontSize: 14, color: theme.palette.text.secondary }}>
                    {attachedFile ? attachedFile.name : 'No file attached'}
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
        </Paper>
    );
};

export default PromptInput;
