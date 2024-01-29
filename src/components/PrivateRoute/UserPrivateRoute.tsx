import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '@/redux/store';

const UserPrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log(currentUser);
  return currentUser ? (
    <Outlet context={currentUser.token} />
  ) : (
    <Navigate replace to={'/signin'} />
  );
};

export default UserPrivateRoute;
