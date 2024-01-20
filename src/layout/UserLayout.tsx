import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import UserSidebar from '@/components/user-page/UserSidebar';

const UserLayout = () => {
    return (
        <Layout>
            <div className="w-full h-full py-5  px-4 md:px-6 xl:px-16">
                <div className="w-full flex gap-4">
                    <UserSidebar />
                    <Outlet />
                </div>
            </div>
        </Layout>
    );
};

export default UserLayout;
