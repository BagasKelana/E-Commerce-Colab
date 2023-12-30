import {
    LogOut,
    Mail,
    MessageSquare,
    Settings,
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
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { useDispatch } from 'react-redux';

import { signOutUserSuccess } from '@/redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        window.location.reload();
        dispatch(signOutUserSuccess());
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger role="button" asChild>
                <div className="h-8 w-8 mr-2 rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        alt="user avatar"
                        src="/images/profile_3135715.png"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                hideWhenDetached={true}
                align="end"
                className="w-56 h-64 z-[100] shadow shadow-gray-400 "
                sideOffset={10}
                alignOffset={-30}
            >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/user">
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>My Cart</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            <span>My Orders</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>...</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
