import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import UserSidebar from '@/components/user-page/UserSidebar';

const UserLayout = () => {
    return (
        <Layout>
            <div className="w-full h-full px-4 xl:px-20 py-5 ">
                <div className="w-full flex gap-4">
                    <UserSidebar />
                    <Outlet />
                </div>
            </div>
        </Layout>
    );
};

export default UserLayout;
