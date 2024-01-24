import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import ProductPage from './pages/ProductPage';
import DashboardPage from './pages/DashboardPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProductDetailsPage from './pages/ProductDetailsPage';
import User from './pages/User';
import UserSettings from './pages/UserSettings';
import UserPrivateRoute from './components/PrivateRoute/UserPrivateRoute';
import { useEffect } from 'react';
import UserLayout from './layout/UserLayout';
import UserOrder from './pages/UserOrder';
import AuthRoute from './components/PrivateRoute/AuthRoute';
import Cart from './pages/Cart/Cart';
import UserChangePassword from './components/user-page/UserChangePassword';
import SuccessPage from './pages/SuccessPage';


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/dashboard-admin" element={<DashboardPage />} />
            <Route path="/user/:id/setting" element={<UserSettings />} />
            <Route path="*" element={<>404 Kosong</>} />

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

            <Route path="/cart" element={<Cart />} />
            <Route path='/checkout/success-page' element={<SuccessPage/>} />

            <Route element={<UserPrivateRoute />}>
                <Route path="/user" element={<UserRedirect />} />
                <Route element={<UserLayout />}>
                    <Route path="/user/profile" element={<User />} />
                    <Route path="/user/my-order" element={<UserOrder />} />
                    <Route
                        path="/user/change-password"
                        element={<UserChangePassword />}
                    />
                </Route>
            </Route>

            <Route element={<AuthRoute />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
}

const UserRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/user/profile', { replace: true });
    }, [navigate]);

    return null;
};
