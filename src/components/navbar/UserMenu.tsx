import {
    LayoutDashboard,
    LogOut,
    Settings,
    ShieldCheck,
    ShoppingBag,
    ShoppingCart,
    User
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { useDispatch, useSelector } from 'react-redux';

import { signOutUserSuccess } from '@/redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '../ui/avatar';
import { showImageAPI } from '@/helpers/showImageAPI';
import { firstLetterToUpper } from '@/helpers/firstLetterToUpper';

export function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: RootState) => state.user);
    const handleLogout = () => {
        dispatch(signOutUserSuccess());
        navigate('/', { replace: true });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger role="button" asChild>
                <div className="h-8 w-8 mr-2 rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        alt="user avatar"
                        src={
                            currentUser?.image
                                ? `${import.meta.env.VITE_DEVELOPE_API_IMG}/${
                                      currentUser.image
                                  }`
                                : '/images/profile_3135715.png'
                        }
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                hideWhenDetached={true}
                align="end"
                className="w-56 h-fit py-2 z-[100] shadow-border-sm shadow-slate-400/30 rounded bg-white "
                sideOffset={10}
                alignOffset={-50}
            >
                <DropdownMenuLabel>
                    <div className="w-full px-4 py-2 flex gap-2">
                        <Avatar>
                            <AvatarImage
                                src={showImageAPI(currentUser?.image)}
                            />
                        </Avatar>

                        <div>
                            <h3 className="line-clamp-1 ">
                                {firstLetterToUpper(currentUser?.name)}
                            </h3>

                            {currentUser?.role === 'admin' ? (
                                <span className="whitespace-nowrap text-teal-700/80 flex gap-1 items-center font-normal">
                                    <ShieldCheck className="w-4 h-full" />
                                    {currentUser.role}
                                </span>
                            ) : (
                                <span className="whitespace-nowrap text-black flex gap-1 items-center font-normal">
                                    {currentUser?.role}
                                </span>
                            )}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/user">
                        <DropdownMenuItem
                            className={cn(
                                'cursor-pointer',
                                currentUser?.role === 'admin'
                                    ? 'text-teal-700'
                                    : 'text-black'
                            )}
                        >
                            <User
                                className={
                                    currentUser?.role === 'admin'
                                        ? 'mr-2 h-4 w-4'
                                        : 'mr-2 h-4 w-4 stroke-[1.3]'
                                }
                            />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4 stroke-[1.3]" />
                        <span className="text-black">Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="">
                    {currentUser?.role === 'admin' && (
                        <Link to={'/dashboard-admin/products'}>
                            <DropdownMenuItem>
                                <LayoutDashboard className="mr-2 h-4 w-4 stroke-[1.3]" />
                                <span className="text-black">
                                    Dashboard Admin
                                </span>
                            </DropdownMenuItem>
                        </Link>
                    )}
                    <DropdownMenuItem>
                        <ShoppingCart className="mr-2 h-4 w-4 stroke-[1.3]" />
                        <span className="text-black">My Cart</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ShoppingBag className="mr-2 h-4 w-4 stroke-[1.3]" />
                        <span className="text-black">My Orders</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive/90 "
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4 " />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
