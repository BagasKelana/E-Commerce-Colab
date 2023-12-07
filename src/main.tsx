import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<PersistGate
			loading={null}
			persistor={persistor}>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>
);
