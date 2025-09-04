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

interface PromptInputProps {
  onSend: (prompt: string, files?: File[], mockServerToggle?: string) => void;
  displayHelp: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend }) => {
  const [prompt, setPrompt] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const mockServerToggle = useSelector((state: any) => state.ui.mockServerToggle);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter((file) =>
        ['.csv', '.pdf', '.doc', '.docx'].some((ext) =>
          file.name.toLowerCase().endsWith(ext)
        )
      );
      setAttachedFiles((prev) =>
        [...prev, ...newFiles].filter(
          (file, idx, arr) => arr.findIndex((f) => f.name === file.name) === idx
        )
      );
      if (inputFileRef.current) inputFileRef.current.value = '';
    }
  };

  const handleAttachClick = () => {
    inputFileRef.current?.click();
  };

  const handleSend = () => {
    if (!prompt.trim() && attachedFiles.length === 0) return;
    onSend(prompt.trim(), attachedFiles.length > 0 ? attachedFiles : undefined, mockServerToggle);
    setPrompt('');
    setAttachedFiles([]);
  };

  useEffect(() => {
    console.log('attachedFiles: ', attachedFiles);
  }, [attachedFiles]);

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
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
            {attachedFiles.length > 0 ? (
              attachedFiles.map((file, idx) => (
                <Chip
                  key={file.name + idx}
                  sx={{ maxWidth: '10rem' }}
                  variant="filled"
                  label={file.name}
                  onDelete={() => {
                    setAttachedFiles((files) =>
                      files.filter((f) => f.name !== file.name)
                    );
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
            sx={{ whiteSpace: 'nowrap' }}
          >
            <SendRoundedIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PromptInput;
