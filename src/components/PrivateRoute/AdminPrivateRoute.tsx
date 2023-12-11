import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    return currentUser ? <Outlet /> : <Navigate to={'/login'} />;
};
export default AdminPrivateRoute;
