import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; // redux-logger
import { thunk } from 'redux-thunk';

// Reducers
import urlQueryControlSlice from './reducers/querys';
import storeBuilderSettings from './reducers/builderSettings';
import storeTemplate from './reducers/template';
import builderMiddleware from './middleware';
import toast from './reducers/toast';

export const store = configureStore({
  reducer: {
    urlQueryControlSlice,
    storeBuilderSettings,
    storeTemplate,
    toastAlerts: toast,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([builderMiddleware, thunk]), //  redux-logger
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
