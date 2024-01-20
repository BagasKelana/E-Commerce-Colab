import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import ProductPage from './pages/ProductPage';
import DashboardPage from './pages/DashboardPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProductDetailsPage from './pages/ProductDetailsPage';
import User from './pages/User';
import UserPrivateRoute from './components/PrivateRoute/UserPrivateRoute';
import { useEffect } from 'react';
import UserLayout from './layout/UserLayout';
import UserOrder from './components/user-page/UserOrder';
import AuthRoute from './components/PrivateRoute/AuthRoute';
import Cart from './pages/Cart/Cart';
import UserChangePassword from './components/user-page/UserChangePassword';
import ProductsAdmin from './components/dashboard-page/Products/ProductsAdmin';
import AddProduct from './components/dashboard-page/Products/add-product/AddProduct';
import UserManagement from './components/dashboard-page/User/UserManagement';
import UpdateUser from './components/dashboard-page/User/UpdateUser';
import CategoryManagement from './components/dashboard-page/Category/CategoryManagement';
import OrderManagement from './components/dashboard-page/Order/OrderManagement';
import UserOrderDetail from './components/user-page/order-detail/UserOrderDetail';

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="*" element={<>404 Kosong</>} />
            <Route element={<AuthRoute />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/cart" element={<Cart />} />

            <Route element={<UserPrivateRoute />}>
                <Route path="/user" element={<UserRedirect />} />
                <Route element={<UserLayout />}>
                    <Route path="/user/profile" element={<User />} />
                    <Route path="/user/my-order" element={<UserOrder />} />
                    <Route
                        path="/user/my-order/detail/:id"
                        element={<UserOrderDetail />}
                    />
                    <Route
                        path="/user/change-password"
                        element={<UserChangePassword />}
                    />
                </Route>
            </Route>
            <Route element={<DashboardPage />}>
                <Route
                    path="/dashboard-admin/product"
                    element={<ProductsAdmin />}
                />
                <Route
                    path="/dashboard-admin/add-product"
                    element={<AddProduct />}
                />
                <Route
                    path="/dashboard-admin/update-product"
                    element={<AddProduct />}
                />

                <Route
                    path="/dashboard-admin/users"
                    element={<UserManagement />}
                />
                <Route
                    path="/dashboard-admin/users/update/:id"
                    element={<UpdateUser />}
                />
                <Route
                    path="/dashboard-admin/Categories"
                    element={<CategoryManagement />}
                />
                <Route
                    path="/dashboard-admin/Orders"
                    element={<OrderManagement />}
                />
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
