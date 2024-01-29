import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { path } from '@/constants/path';
import DashboardPage from '@/pages/Admin/Dashboard';
import Cart from '@/pages/Cart';
import HomePage from '@/pages/Home';
import ProductPage from '@/pages/Product';
import ProductDetailsPage from '@/pages/ProductDetail';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import User from '@/pages/User';
import UserChangePassword from '@/pages/UserChangePassword';
import UserOrder from '@/pages/UserOrder';

import CategoryManagement from './components/dashboard-page/Category/CategoryManagement';
import OrderManagement from './components/dashboard-page/Order/OrderManagement';
import AddProduct from './components/dashboard-page/Products/add-product/AddProduct';
import ProductsAdmin from './components/dashboard-page/Products/ProductsAdmin';
import UpdateUser from './components/dashboard-page/User/UpdateUser';
import UserManagement from './components/dashboard-page/User/UserManagement';
import AuthRoute from './components/PrivateRoute/AuthRoute';
import UserPrivateRoute from './components/PrivateRoute/UserPrivateRoute';
import UserOrderDetail from './components/user-page/order-detail/UserOrderDetail';
import UserLayout from './layout/UserLayout';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path={path.HOME} element={<HomePage />} />
      <Route path={path.PRODUCT} element={<ProductPage />} />
      <Route path={path.PRODUCT_DETAIL} element={<ProductDetailsPage />} />
      <Route path="*" element={<>404 Kosong</>} />
      <Route element={<AuthRoute />}>
        <Route path={path.SIGN_IN} element={<SignIn />} />
        <Route path={path.SIGN_UP} element={<SignUp />} />
      </Route>
      <Route path={path.CART} element={<Cart />} />

      <Route element={<UserPrivateRoute />}>
        <Route path={path.USER} element={<UserRedirect />} />
        <Route element={<UserLayout />}>
          <Route path={path.USER_PROFILE} element={<User />} />
          <Route path={path.USER_MY_ORDER} element={<UserOrder />} />
          <Route
            path={path.USER_MY_ORDER_DETAIL}
            element={<UserOrderDetail />}
          />
          <Route
            path={path.USER_CHANGE_PASSWORD}
            element={<UserChangePassword />}
          />
        </Route>
      </Route>

      <Route element={<DashboardPage />}>
        <Route path={path.ADMIN_PRODUCTS} element={<ProductsAdmin />} />
        <Route path={path.ADMIN_ADD_PRODUCT} element={<AddProduct />} />
        <Route path={path.ADMIN_UPDATE_PRODUCT} element={<AddProduct />} />
        <Route path={path.ADMIN_USERS} element={<UserManagement />} />
        <Route path={path.ADMIN_USERS_UPDATE} element={<UpdateUser />} />
        <Route path={path.ADMIN_CATEGORIES} element={<CategoryManagement />} />
        <Route path={path.ADMIN_ORDERS} element={<OrderManagement />} />
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
