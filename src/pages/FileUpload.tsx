import React, { useRef } from 'react';
import {
    Box,
    Button,
    Card,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    Typography,
    Avatar,
    SelectChangeEvent,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
    setDomain,
    addFiles,
    removeFile,
} from '../redux/fileUploadSlice';

const FileUploadPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { domain, uploadedFiles } = useSelector(
        (state: RootState) => state.fileUpload
    );

    const inputFileRef = useRef<HTMLInputElement>(null);


    const handleDomainChange = (event: SelectChangeEvent) => {
        dispatch(setDomain(event.target.value));
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const filesArray = Array.from(event.target.files);
            dispatch(addFiles(filesArray));
            event.target.value = ''; // reset input so same files can be re-uploaded
        }
    };

    const handleDeleteFile = (id: string) => {
        dispatch(removeFile(id));
    };

    const handleStartProcessing = () => {
        alert(`Start processing ${uploadedFiles.length} files for domain "${domain}"`);
    };

    return (
        <Box sx={{
            maxWidth: 1000,
            width: '100%'
        }} mx="auto" p={0}>
            <Typography variant="h4" color="textSecondary" gutterBottom>
                File Upload
            </Typography>
            <Typography variant="caption" color="textSecondary" gutterBottom>
                Upload files to create knowledge graphs
            </Typography>

            <Box
                mt={3}
                display="flex"
                gap={4}
                flexDirection={{ xs: 'column', md: 'row' }}
            >
                <Box flex={1}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <UploadFileIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" gutterBottom>
                            Upload Files
                        </Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary" gutterBottom>
                        Drag and drop files or click to select. Supports multiple files and ZIP archives.
                    </Typography>

                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="domain-select-label">Select Domain</InputLabel>
                        <Select
                            labelId="domain-select-label"
                            value={domain}
                            label="Select Domain"
                            onChange={handleDomainChange}
                        >
                            <MenuItem value="Healthcare">Healthcare</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Legal">Legal</MenuItem>
                        </Select>
                    </FormControl>

                    <Box
                        sx={{
                            border: '2px dashed #aaa',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            cursor: 'pointer',
                            width: '100%',
                        }}
                        onClick={() => inputFileRef.current?.click()}
                    >
                        <UploadFileRoundedIcon sx={{ fontSize: 48, color: '#888' }} />
                        <Typography variant="h6" mt={1}>
                            Click or Drag files here to upload
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Supported files: PDF, DOCX, TXT, PNG, JPG
                        </Typography>
                        <input
                            type="file"
                            multiple
                            hidden
                            ref={inputFileRef}
                            onChange={handleFileInputChange}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={handleStartProcessing}
                        disabled={uploadedFiles.length === 0 || !domain}
                    >
                        Start Processing
                    </Button>
                </Box>

                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                        Uploaded Files
                    </Typography>
                    <Typography variant="caption" color="textSecondary" gutterBottom>
                        {uploadedFiles.length} file(s) ready for processing
                    </Typography>

                    <List>
                        {uploadedFiles.map(({ id, name, size }) => (
                            <Card
                                key={id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 2,
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <UploadFileIcon />
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={name}
                                    secondary={`${(size / 1024).toFixed(2)} KB`}
                                />

                                <IconButton edge="end" onClick={() => handleDeleteFile(id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Card>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default FileUploadPage;
