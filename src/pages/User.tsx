import UserProfileForm from '@/components/user-page/UserProfileForm';
import Layout from '@/layout/Layout';
import { cn } from '@/lib/utils';

import { Link } from 'react-router-dom';

const User = () => {
    return (
        <Layout bgColor="bg-slate-50">
            <div className="w-full pl-4 md:px-20 py-5 ">
                <div className="w-full grid grid-cols-4 gap-4">
                    <DocsSidebarNavItems />
                    <main className="w-full col-span-3 bg-white p-4">
                        <div>
                            <h2 className="font-medium text-base">
                                My Profile
                            </h2>
                            <p className="text-sm text-neutral-500">
                                Kelola informasi profil Anda untuk mengontrol,
                                melindungi dan mengamankan akun
                            </p>
                        </div>

                        <hr className="mt-4" />
                        <div>
                            <UserProfileForm />
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
    );
};

export function DocsSidebarNavItems() {
    const items = [
        {
            title: 'My Profile',
            disabled: false,
            external: true
        },
        {
            title: 'My Profile',
            disabled: false,
            external: true
        },
        {
            title: 'My Profile',
            disabled: false,
            external: true
        }
    ];

    return items?.length ? (
        <div className="grid grid-flow-row auto-rows-max text-sm">
            {items.map((item, index) =>
                !item.disabled ? (
                    <Link
                        key={index}
                        to="/"
                        className={cn(
                            'flex w-full items-center rounded-md p-2 hover:underline',

                            'bg-muted'
                        )}
                        target={item.external ? '_blank' : ''}
                        rel={item.external ? 'noreferrer' : ''}
                    >
                        {item.title}
                    </Link>
                ) : (
                    <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">
                        {item.title}
                    </span>
                )
            )}
        </div>
    ) : null;
}

export default User;
