import { Search, CircleUserRound, ShoppingCart, Menu } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import { Input, InputProps } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const categoriesProduct = [
    'baju',
    'games',
    'laptop',
    'kecantikan',
    'olahraga',
    'hobi',
    'permainan'
];

type NavbarProps = {
    className?: string;
    stikyNavBar: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ className, stikyNavBar }) => {
    const [term, setTerm] = useState('');
    const [queryParameters] = useSearchParams();

    const navigate = useNavigate();

    const handleOnKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement> & {
            target: EventTarget &
                HTMLInputElement &
                React.ForwardRefExoticComponent<
                    InputProps & React.RefAttributes<HTMLInputElement>
                >;
        }
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.value) {
                queryParameters.set('sf', '');
                const url = `/product?q=${e.target.value}&sf=`;
                navigate(url);
            }
        }
    };

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement> & {
            target: React.ForwardRefExoticComponent<
                InputProps & React.RefAttributes<HTMLInputElement>
            >;
        }
    ) => {
        setTerm(() => e.target.value);
    };

    return (
        <header
            className={cn(
                'bg-white w-full top-0 fixed z-[100] ',
                stikyNavBar && className
            )}
        >
            <div className="container mx-auto px-4 md:px-8 py-4 md:pt-8 flex items-center justify-between md:justify-start">
                <div className="mr-auto w-48 flex-shrink-0 hidden md:flex ">
                    <Link to="/">
                        <img
                            className="h-10"
                            src="/images/online shop ecommerce logo app icon logo - Dibuat dengan PosterMyWall.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="w-full max-w-xs md:max-w-full 2xl:max-w-3xl rounded-md flex items-center focus-within:ring-2 focus-within:ring-amber-500 border border-input transition ease-in-out duration-200 ">
                    <select
                        className="bg-transparent uppercase font-medium text-sm py-2 px-2 mr-2 hidden lg:block"
                        name=""
                        id=""
                    >
                        <option>all categories</option>
                    </select>
                    <Input
                        value={term}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                        className="focus-visible:ring-0 border border-l-input border-r-0 border-y-0 focus-visible:ring-offset-0  md:rounded-none text-xs md:text-base "
                        type="text"
                        placeholder="Cari product disini..."
                    />
                    <div className="ml-auto px-2 md:px-4 text-gray-500 ">
                        <Search className="h-5 w-5" />
                    </div>
                </div>
                <nav className="contents">
                    <ul className="ml-4 xl:w-48 flex items-center justify-end">
                        <li className="ml-2 lg:ml-4 relative inline-block">
                            <Link className="" to={'/'}>
                                <CircleUserRound className="h-10 p-2 w-10 text-gray-500 hover:text-gray-600" />
                            </Link>
                        </li>
                        <li className="ml-2 lg:ml-4 relative inline-block">
                            <Link to="">
                                <div className="absolute -top-0 right-0 z-10 bg-orange-300 text-xs font-semibold p-0.5 rounded-full">
                                    20
                                </div>
                                <ShoppingCart className="w-10 h-10 p-2" />
                            </Link>
                        </li>
                        <HumburgerMenu />
                    </ul>
                </nav>
            </div>
            <div className="w-full px-8 pb-2 hidden md:flex items-center justify-center space-x-5 text-gray-500 text-base">
                {categoriesProduct.map((categorie, index) => (
                    <div key={index}>{categorie}</div>
                ))}
            </div>
            <hr />
        </header>
    );
};

export function HumburgerMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <li className="ml-2 lg:ml-4 relative inline-block md:hidden">
                    <Menu className="w-10 h-10 p-2" />
                </li>
            </SheetTrigger>
            <SheetContent className="overflow-auto no-scrollbar">
                <SheetHeader>
                    <SheetTitle>Menu Utama</SheetTitle>
                </SheetHeader>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse nulla maxime adipisci, corporis ea error ducimus quos
                    maiores fuga? Nobis ipsam nemo, earum odio officiis quasi
                    animi aut pariatur consectetur!
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default Navbar;
