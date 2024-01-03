import { Heart, Menu, MenuSquare, Star, StoreIcon } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Link } from 'react-router-dom';

export default function HumburgerMenu() {
    const { currentUser } = useSelector((state: RootState) => state.user);

    function userIsAuth() {
        if (currentUser) {
            return (
                <Link to="/user">
                    <div className="flex gap-4 my-4 cursor-pointer">
                        <div className="h-14 w-14 rounded-full overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                alt="user avatar"
                                src={
                                    currentUser?.image
                                        ? `${
                                              import.meta.env
                                                  .VITE_DEVELOPE_API_IMG
                                          }/${currentUser.image}`
                                        : '/images/profile_3135715.png'
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-medium text-lg">
                                {currentUser.name}
                            </h2>
                            <p className="font-normal text-muted-foreground">
                                {currentUser.email}
                            </p>
                        </div>
                    </div>
                </Link>
            );
        }
        return (
            <div className="w-full flex justify-between gap-4 my-4">
                <Link
                    className="text-white py-1 px-2 text-center bg-teal-700 w-full"
                    aria-label="Masuk"
                    to={'/signin'}
                >
                    Masuk
                </Link>
                <Link
                    className="text-teal-700 py-1 border border-teal-700 text-center font-semibold px-2 bg-slate-50 w-full"
                    aria-label="Daftar"
                    to={'/signup'}
                >
                    Daftar
                </Link>
            </div>
        );
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <li className="ml-2 lg:ml-4 relative inline-block md:hidden">
                    <Menu className="w-10 h-10 p-2 text-slate-100 cursor-pointer" />
                </li>
            </SheetTrigger>
            <SheetContent className="overflow-auto no-scrollbar">
                <SheetHeader>
                    <SheetTitle>Menu Utama</SheetTitle>
                </SheetHeader>
                {userIsAuth()}
                <hr />
                <div className="w-full my-4">
                    <ul className="space-y-5">
                        <li className="whitespace-normal flex gap-2 items-center ">
                            <MenuSquare className=" text-black " />
                            Daftar Transaksi
                        </li>
                        <li className="whitespace-normal flex gap-2">
                            <Star className="text-black" />
                            Ulasan
                        </li>
                        <li className="whitespace-normal flex gap-2">
                            <Heart />
                            Wishlist
                        </li>
                        <li className="whitespace-normal flex gap-2">
                            <StoreIcon />
                            Toko yang difollow
                        </li>
                    </ul>
                </div>
                <hr />
                <SheetFooter>
                    <div className="w-full my-4">
                        <ul className="space-y-5">
                            <li className="whitespace-normal flex gap-2 items-center ">
                                <MenuSquare className=" text-black " />
                                Daftar Transaksi
                            </li>
                            <li className="whitespace-normal flex gap-2">
                                <Star className="text-black" />
                                Ulasan
                            </li>
                            <li className="whitespace-normal flex gap-2">
                                <Heart />
                                Wishlist
                            </li>
                            <li className="whitespace-normal flex gap-2">
                                <StoreIcon />
                                Toko yang difollow
                            </li>
                        </ul>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
