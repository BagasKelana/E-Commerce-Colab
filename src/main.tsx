import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import ProductCategories from './ProductCategories.tsx';
import { persistor, store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ProductCategories>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </ProductCategories>
    </PersistGate>
  </Provider>
);
