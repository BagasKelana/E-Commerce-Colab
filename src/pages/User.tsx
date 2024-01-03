import { Avatar, AvatarImage } from '@/components/ui/avatar';
import UserProfileForm from '@/components/user-page/UserProfileForm';

import Layout from '@/layout/Layout';

import { RootState } from '@/redux/store';
import { MenuSquare, Pencil, User2 } from 'lucide-react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

const User = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    return (
        <Layout>
            <div className="w-full min-h-screen h-full pl-4 md:px-20 py-5 bg-slate-100">
                <div className="w-full grid grid-cols-5 gap-4">
                    <div className="w-full col-span-1 flex flex-col ">
                        <div className="w-full my-4 flex gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage
                                    src={
                                        currentUser?.image
                                            ? `${
                                                  import.meta.env
                                                      .VITE_DEVELOPE_API_IMG
                                              }/${currentUser?.image}`
                                            : 'images/profile_3135715.png'
                                    }
                                />
                            </Avatar>
                            <div className="flex flex-col my-1">
                                <h3 className="text-sm font-semibold">
                                    {currentUser?.name}
                                </h3>
                                <p className="text-muted-foreground text-sm whitespace-nowrap flex items-center gap-1">
                                    <Pencil className="h-4 w-4" />
                                    <span>Ubah Profile</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-7">
                            <ul className="font-medium text-sm flex flex-col gap-4 select-none">
                                <NavLink
                                    to="/user/profile"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'text-teal-800'
                                            : 'text-black'
                                    }
                                >
                                    <li className="flex whitespace-nowrap gap-2">
                                        <User2 className="h-5 w-5" />
                                        <span> My Profile</span>
                                    </li>
                                </NavLink>
                                <NavLink
                                    to="/user/my-order"
                                    className={({ isActive, isPending }) =>
                                        isPending
                                            ? 'pending'
                                            : isActive
                                            ? 'text-teal-800'
                                            : 'text-black'
                                    }
                                >
                                    <li className="flex whitespace-nowrap gap-2">
                                        <MenuSquare className="h-5 w-5" />
                                        <span>My Order</span>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                    <main className="w-full col-span-4 bg-white p-4">
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

export default User;
