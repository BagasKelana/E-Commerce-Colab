import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MenuSquareIcon, Pencil, User2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

const UserSidebar = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    return (
        <div className="hidden lg:flex flex-col md:w-[300px] ">
            <div className="w-full my-4 flex gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={
                            currentUser?.image
                                ? `${import.meta.env.VITE_DEVELOPE_API_IMG}/${
                                      currentUser?.image
                                  }`
                                : '/images/profile_3135715.png'
                        }
                    />
                    <AvatarFallback>
                        <img
                            src="/images/profile_3135715.png"
                            alt="user-image"
                        />
                    </AvatarFallback>
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

            <div className="font-medium text-sm  flex flex-col select-none mt-7">
                <Accordion
                    defaultValue="item-1"
                    type="single"
                    className="w-full leading-4"
                >
                    <AccordionItem className="border-0 " value="item-1">
                        <NavLink to="/user/profile">
                            <AccordionTrigger className="hover:no-underline p-0 pb-4">
                                <li className="flex whitespace-nowrap gap-2">
                                    <User2 className="h-4 w-4 text-teal-700" />
                                    <span> My Account</span>
                                </li>
                            </AccordionTrigger>
                        </NavLink>
                        <AccordionContent>
                            <div className="flex flex-col gap-4 ml-8 font-normal">
                                <NavLink
                                    to="/user/profile"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-teal-600 font-medium'
                                            : 'text-neutral-600'
                                    }
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/user/change-password"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-teal-600 font-medium'
                                            : 'text-neutral-600 font-normal '
                                    }
                                >
                                    Ubah Password
                                </NavLink>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="border-0" value="item-2">
                        <NavLink
                            to="/user/my-order"
                            className={({ isActive }) =>
                                isActive ? 'text-teal-600' : 'text-black'
                            }
                        >
                            <AccordionTrigger className="hover:no-underline p-0 pb-4">
                                <li className="flex whitespace-nowrap gap-2">
                                    <MenuSquareIcon className="h-4 w-4 text-orange-500" />
                                    <span>My Order</span>
                                </li>
                            </AccordionTrigger>
                        </NavLink>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default UserSidebar;
