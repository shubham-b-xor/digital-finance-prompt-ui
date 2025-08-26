import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import chatReducer from './chatSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
