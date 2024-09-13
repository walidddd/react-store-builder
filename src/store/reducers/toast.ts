// src/slices/toastSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a toast
interface Toast {
  id: string;
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
}

// Define the type for the toast state
interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;

// ##### If You need display any toast alert
// dispatch(
//     addToast({
//         id: `${new Date().getTime()}`,
//         severity: 'success',
//         summary: 'Success',
//         detail: 'This is a success message',
//     })
// );
