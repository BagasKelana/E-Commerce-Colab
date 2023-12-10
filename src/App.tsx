import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import ProductPage from './pages/ProductPage';
import DashboardPage from './pages/DashboardPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProductDetailsPage from './pages/ProductDetailsPage';
import User from './pages/User';
import UserSettings from './pages/UserSettings';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/dashboard-admin" element={<DashboardPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/user/:id/setting" element={<UserSettings />} />

            {/* <Route element={<AdminPrivateRoute />}>

                <Route path="/dashboard-admin" element={< />} />
                <Route path="/dashboard-admin/product" element={< />} />
                <Route path="/dashboard-admin/add-product" element={< />} /> 
                <Route path="/dashboard-admin/categories" element={< />} />
                <Route path="/dashboard-admin/add-category" element={< />} />
                <Route path="/dashboard-admin/customers" element={< />} />
                <Route path="/dashboard-admin/customer-details" element={< />} />
                <Route path="/dashboard-admin/orders" element={< />} />
                <Route path="/dashboard-admin/order-details" element={< />} />

            </Route> */}

            {/* <Route element={<UserPrivateRoute />}>

               
                
            </Route> */}
        </Routes>
    );
}
