import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div className="w-full h-full relative">
            <Navbar />
            <aside className="w-[254px] h-screen fixed top-0 left-0 border border-slate-300 mt-[110px]"></aside>
            <div className="flex-1 transition-all ease-in-out duration-300 mt-[110px] ml-[254px]">
                <main className="w-full h-full bg-slate-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
