import { Heart, List, Menu, MenuSquare, Star, StoreIcon } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Link } from 'react-router-dom';

export default function HumburgerMenu() {
    const { currentUser } = useSelector((state: RootState) => state.user);
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
