// DATA CONTROLLERS
// ------------------
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Settings Builder
const initialState = {
  screenSize: 'md',
  activePage: '',
  loadingGlobal: '', // Or end
};

// Create the slice
const storeBuilderSettings = createSlice({
  name: 'storeDataController',
  initialState,
  reducers: {
    updateScreenSize(state, action) {
      const { screenSize = '' } = action.payload;
      state.screenSize = screenSize;
    },
    updateActivePage(state, action) {
      const { activePage = '' } = action.payload;
      state.activePage = activePage;
    },
    updateLoadingGlobal(state, action) {
      const { loadingGlobal = false } = action.payload;
      state.loadingGlobal = loadingGlobal;
    },
  },
});

export default storeBuilderSettings.reducer;

// Export actions from the slice
export const { updateActivePage, updateScreenSize, updateLoadingGlobal } =
  storeBuilderSettings.actions;
