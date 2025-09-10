import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  mockServerToggle: string;
  isFileUploaded: boolean;
  isNewChatDialogOpen: boolean;
  awaitingResponse: boolean;
  prompt: string;
}

const initialState: UIState = {
  darkMode: true,
  sidebarOpen: true,
  mockServerToggle: 'success',
  isFileUploaded: false,
  isNewChatDialogOpen: false,
  awaitingResponse: false,
  prompt: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setMockServerToggle(state, action: PayloadAction<string>) {
      state.mockServerToggle = action.payload;
    },
    toggleIsFileUploaded: (state) => {
      state.isFileUploaded = !state.isFileUploaded;
    },
    setIsFileUploaded(state, action: PayloadAction<boolean>) {
      state.isFileUploaded = action.payload;
    },
    setIsNewChatDialog(state, action: PayloadAction<boolean>) {
      state.isNewChatDialogOpen = action.payload;
    },
    setAwaitingResponse(state, action: PayloadAction<boolean>) {
      state.awaitingResponse = action.payload;
    },
  },
});

export const { setPrompt, toggleDarkMode, toggleSidebar, setMockServerToggle, toggleIsFileUploaded, setIsFileUploaded, setIsNewChatDialog, setAwaitingResponse } = uiSlice.actions;
export default uiSlice.reducer;
