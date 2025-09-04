import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import chatReducer from './chatSlice';
import settingsReducer from './settingsSlice';
import masterConfigReducer from './masterConfigSlice';
import fileUploadReducer from './fileUploadSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    settings: settingsReducer,
    masterConfig: masterConfigReducer,
    fileUpload: fileUploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
