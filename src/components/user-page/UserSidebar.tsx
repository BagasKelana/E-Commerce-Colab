import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MenuSquare, Pencil, User2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const UserSidebar = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    return (
        <div className="w-full col-span-1 flex flex-col ">
            <div className="w-full my-4 flex gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={
                            currentUser?.image
                                ? `${import.meta.env.VITE_DEVELOPE_API_IMG}/${
                                      currentUser?.image
                                  }`
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
    );
};

export default UserSidebar;
