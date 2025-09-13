import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSliceState, MutableToastParams } from '../../types/slices';

const initialState: AppSliceState = {
  appLoaded: false,
  toast: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoaded(state, action: PayloadAction<boolean>) {
      state.appLoaded = action.payload;
    },
    showToast(state, action: PayloadAction<MutableToastParams>) {
      state.toast = action.payload;
    },
    hideToast(state) {
      state.toast = undefined;
    },
  },
});

export const { setAppLoaded, showToast, hideToast } = appSlice.actions;
export default appSlice.reducer;