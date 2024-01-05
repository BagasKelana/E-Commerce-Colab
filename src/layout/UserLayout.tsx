import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import UserSidebar from '@/components/user-page/UserSidebar';

const UserLayout = () => {
    return (
        <Layout>
            <div className="w-full min-h-screen h-full pl-4 md:px-20 py-5 bg-slate-100">
                <div className="w-full grid grid-cols-6 gap-4">
                    <UserSidebar />
                    <Outlet />
                </div>
            </div>
        </Layout>
    );
};

export default UserLayout;
