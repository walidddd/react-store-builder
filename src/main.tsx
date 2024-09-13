import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/scss/app.scss';

import { store } from './store/store.ts';

import { Provider } from 'react-redux';
import './lang/i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
