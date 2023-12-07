import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import ProductPage from './pages/ProductPage';
import Test from './pages/Test';

export default function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LandingPage />}
			/>

			<Route
				path="/product"
				element={<ProductPage />}
			/>
			<Route
				path="/test"
				element={<Test />}
			/>
		</Routes>
	);
}
