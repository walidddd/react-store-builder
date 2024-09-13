// DATA CONTROLLERS
// ------------------
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMessageToLexEditor } from './../../helpers/common';
import { DROP, SELECT } from '../../helpers/global-variables';
import { fetchSchemaData } from '../asynchronousActions';

interface TemplateState {
  schemaFields: Record<string, any>;
  schemaData: Record<string, any>;
  globalSettingsData: Record<string, any>;
  globalSettingsFields: Record<string, any>;
  schemaSettingsLoading: boolean;
  schemaSettingsError: string | null;
  schemaLoading: boolean;
  schemaError: string | null;
  typeOfEventOnThem: string;
  selectedItem: {
    section: string;
    block: string;
  };
}
const initialState: TemplateState = {
  schemaFields: {},
  schemaData: {},
  globalSettingsData: {},
  globalSettingsFields: {},
  schemaSettingsLoading: false,
  schemaSettingsError: null,
  schemaLoading: false,
  schemaError: null,
  typeOfEventOnThem: '',
  selectedItem: {
    section: '',
    block: '',
  },
};

// Create the slice
const storeTemplate = createSlice({
  name: 'storeDataController',
  initialState,
  reducers: {
    // 1
    makeAnimateWhenChange(
      state,
      action: PayloadAction<{ typeOfEventOnThem: string }>
    ) {
      const { typeOfEventOnThem } = action.payload;
      state.typeOfEventOnThem = typeOfEventOnThem;
    },

    // 2
    onSelectItem(state, action) {
      const { section, block } = action.payload;
      state.selectedItem.section = section;
      state.selectedItem.block = block;
    },

    // 3
    onDropItem(_, action) {
      // Data
      const { destinationIndex, order, sections }: any = action.payload;

      // 1- Update Schema

      // 2- Send Message To Editor
      const type = 'section';
      let itemId = '';

      // Get item id
      const itemKey = order[destinationIndex];
      itemId = sections[itemKey]?.type;
      if (itemId)
        sendMessageToLexEditor({
          action: DROP,
          itemId,
          type,
          destinationIndex,
        });
    },

    setSchemaFields(state, action) {
      state.schemaFields = action.payload;
    },
    setSchemaData(state, action) {
      state.schemaData = action.payload;
    },
    setGlobalSettingsData(state, action) {
      state.globalSettingsData = action.payload;
    },
    setGlobalSettingsFields(state, action) {
      state.globalSettingsFields = action.payload;
    },
    setSchemaSettingsLoading(state, action) {
      state.schemaSettingsLoading = action.payload;
    },
    setSchemaSettingsError(state, action) {
      state.schemaSettingsError = action.payload;
    },
    setSchemaLoading(state, action) {
      state.schemaLoading = action.payload;
    },
    setSchemaError(state, action) {
      state.schemaError = action.payload;
    },
  },

  // Handle fetch FILES
  extraReducers: (builder) => {
    builder.addCase(fetchSchemaData.pending, (state) => {
      state.schemaLoading = true;
      state.schemaError = null;
    });

    builder.addCase(fetchSchemaData.fulfilled, (state, action) => {
      state.schemaLoading = true;
      state.schemaData = action.payload;
    });

    builder.addCase(fetchSchemaData.rejected, (state, action) => {
      state.schemaLoading = true;
      console.log(state.schemaError, 'error');
      state.schemaError = action.error?.message ?? null;
    });
  },
});

export const { makeAnimateWhenChange, onSelectItem, onDropItem } =
  storeTemplate.actions;

export default storeTemplate.reducer;
