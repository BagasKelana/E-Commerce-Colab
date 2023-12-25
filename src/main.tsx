import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop.tsx';
import { StrictMode, createContext } from 'react';

export const UserContext = createContext({ role: '' });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <UserContext.Provider value={{ role: '' }}>
                    <BrowserRouter>
                        <ScrollToTop />
                        <App />
                    </BrowserRouter>
                </UserContext.Provider>
            </PersistGate>
        </Provider>
    </StrictMode>
);
