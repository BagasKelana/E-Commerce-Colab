import { Book, Box, Home, ShoppingBag, User } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navSideItems = [
    { id: '123', icon: Home, title: 'Dashboard', to: '/dashboard-admin/' },
    {
        id: '1234',
        icon: Box,
        title: 'Products',
        to: '/dashboard-admin/products'
    },
    { id: '12345', icon: User, title: 'Users', to: '/dashboard-admin/users' },
    {
        id: '123456',
        icon: Book,
        title: 'Categories',
        to: '/dashboard-admin/categories'
    },
    {
        id: '1234567',
        icon: ShoppingBag,
        title: 'Orders',
        to: '/dashboard-admin/orders'
    }
];

const DashboardPage = () => {
    return (
        <div className="w-full h-full relative">
            <aside className="hidden md:flex w-[254px] min-h-screen h-full fixed top-0 -left-0 border-r border-slate-300 bg-white ">
                <div className="flex flex-col w-full gap-4 mt-8">
                    {navSideItems.map(
                        (item, index) =>
                            index > 0 && (
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-e-3xl mr-4'
                                            : 'bg-slate-100 text-black rounded-e-3xl mr-4'
                                    }
                                    to={item.to}
                                >
                                    <div className="w-full flex gap-2 pl-4 py-2">
                                        {<item.icon />} {item.title}
                                    </div>
                                </NavLink>
                            )
                    )}
                </div>
            </aside>
            <div className="flex-1 transition-all ease-in-out duration-300  md:ml-[254px]">
                <main className="w-full min-h-screen h-full bg-slate-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
