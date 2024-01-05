import { RootState } from '@/redux/store';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    return currentUser ? <Navigate replace={true} to={'/'} /> : <Outlet />;
};

export default AuthRoute;
