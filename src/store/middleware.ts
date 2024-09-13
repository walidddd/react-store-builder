import { sendMessageToLexEditor } from '../helpers/common';
import { SAVE_TEMPLATE, SELECT } from '../helpers/global-variables';
import { updateLoadingGlobal } from './reducers/builderSettings';
import {
  setContext,
  setQuerySection,
  updateQueryParamsThunk,
} from './reducers/querys';
import { onDropItem, onSelectItem } from './reducers/template';

// Middleware to automatically trigger updateQueryParamsThunk
const builderMiddleware = (store: any) => (next: any) => (action: any) => {
  // Call the next middleware or reducer
  const result = next(action);

  // Check if the action type is setQuerySection or setContext
  if (action.type === setQuerySection.type || action.type === setContext.type) {
    store.dispatch(updateQueryParamsThunk());
  }

  // Check if the action type is onSelectItem
  if (action.type === onSelectItem.type) {
    const state = store.getState();
    const { block, section } = state.storeTemplate.selectedItem;

    // Update query url
    store.dispatch(
      setQuerySection({
        block: block,
        section: section,
      })
    );

    // Send Event Message SELECT to Iframe
    const itemId = block ? block : section;
    const type = block ? 'block' : 'section';
    sendMessageToLexEditor({ action: SELECT, itemId, type });
  }

  if (action.type === SAVE_TEMPLATE) {
    store.dispatch(updateLoadingGlobal({ loadingGlobal: 'start' }));
    setTimeout(() => {
      store.dispatch(updateLoadingGlobal({ loadingGlobal: 'end' }));
    }, 2000);
    setTimeout(() => {
      store.dispatch(updateLoadingGlobal({ loadingGlobal: 'complete' }));
    }, 3000);
  }

  // if (action.type === onDropItem.type) {
  //   store.dispatch(updateLoadingGlobal({ loadingGlobal: 'start' }));
  //   setTimeout(() => {
  //     store.dispatch(updateLoadingGlobal({ loadingGlobal: 'end' }));
  //   }, 2000);
  //   setTimeout(() => {
  //     store.dispatch(updateLoadingGlobal({ loadingGlobal: 'complete' }));
  //   }, 3000);
  // }
  // Return the result of calling the next middleware or reducer
  return result;
};
export default builderMiddleware;
