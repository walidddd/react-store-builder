// CONTROLLER OF Query URL LINK
// ------------------
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateQueryParams } from '../../helpers/common';

export interface SectionsState {
  section: string;
  block: string;
}

export interface QuerySectionPayload {
  block?: string;
  section?: string;
}

const initialState = {
  section: 'main-product',
  block: '',
  // Context is route for main component content
  context: '',
};

// Create the slice
const urlQueryControlSlice = createSlice({
  name: 'urlQueryControl',
  initialState,
  reducers: {
    // Reducer for setting query section
    setQuerySection(state, action: PayloadAction<QuerySectionPayload>) {
      const { block = '', section = '' } = action.payload;
      state.block = block;
      state.section = section;
    },

    // Reducer for setting context
    setContext(state, action: PayloadAction<string>) {
      state.context = action.payload;
    },
  },
});

// Export actions from the slice
export const { setQuerySection, setContext } = urlQueryControlSlice.actions;

// Thunk for updating query parameters
export const updateQueryParamsThunk = () => (_: any, getState: any) => {
  const { section, block, context } = getState().urlQueryControlSlice;
  updateQueryParams({ key: 'block', value: block });
  updateQueryParams({ key: 'sections', value: section });
  updateQueryParams({ key: 'context', value: context });
};

export default urlQueryControlSlice.reducer;
