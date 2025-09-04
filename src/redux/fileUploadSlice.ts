import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  domain: string;
  file: File;
}

interface FileUploadState {
  domain: string;
  uploadedFiles: UploadedFile[];
}

const initialState: FileUploadState = {
  domain: '',
  uploadedFiles: [],
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setDomain: (state, action: PayloadAction<string>) => {
      state.domain = action.payload;
    },
    addFiles: (state, action: PayloadAction<File[]>) => {
      action.payload.forEach((file) => {
        const id = `${file.name}-${file.size}-${Date.now()}`;
        state.uploadedFiles.push({
          id,
          name: file.name,
          size: file.size,
          domain: state.domain,
          file,
        });
      });
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.uploadedFiles = state.uploadedFiles.filter(
        (file) => file.id !== action.payload
      );
    },
    clearFiles: (state) => {
      state.uploadedFiles = [];
    },
  },
});

export const { setDomain, addFiles, removeFile, clearFiles } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
