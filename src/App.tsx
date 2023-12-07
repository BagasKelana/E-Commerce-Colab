import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import ProductPage from './pages/ProductPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/product" element={<ProductPage />} />
        </Routes>
    );
}
