import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  mockServerToggle: string;
}

const initialState: UIState = {
  darkMode: true,
  sidebarOpen: true,
  mockServerToggle: 'success',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setMockServerToggle(state, action: PayloadAction<string>) {
      state.mockServerToggle = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleSidebar, setMockServerToggle } = uiSlice.actions;
export default uiSlice.reducer;
