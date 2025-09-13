import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import userSlice from './slices/userSlice';
const rootReducer = {
  app: appSlice,
  user: userSlice
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;