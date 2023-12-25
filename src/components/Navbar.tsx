import { useSelector } from 'react-redux';
import { CircleUserRound, ShoppingCart, SearchIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { RootState } from '@/redux/store';
import { UserMenu } from './navbar/UserMenu';
import HumburgerMenu from './navbar/HumburgerMenu';

const categoriesProduct = [
    'baju',
    'games',
    'laptop',
    'kecantikan',
    'olahraga',
    'hobi',
    'permainan'
];

const Navbar = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    return (
        <header className="bg-white min-w-full w-screen top-0 fixed z-[100] shadow-sm shadow-gray-50">
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
                    <SearchBar />
                    <div className="ml-auto px-2 md:px-4 text-gray-500 ">
                        <SearchIcon className="h-5 w-5" />
                    </div>
                </div>
                <nav className="contents">
                    <ul className="ml-4 xl:w-48 flex items-center justify-end">
                        <li className="ml-2 lg:ml-4 relative inline-block">
                            <Link to="">
                                <div className="absolute -top-0 right-0 z-10 bg-orange-300 text-xs font-semibold p-0.5 rounded-full">
                                    20
                                </div>
                                <ShoppingCart className="w-10 h-10 p-2" />
                            </Link>
                        </li>
                        <svg
                            className="relative ml-2 lg:ml-4 md:inline-block hidden"
                            height="20"
                            width="1"
                        >
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="20"
                                style={{ stroke: 'black', strokeWidth: 1 }}
                            />
                        </svg>
                        <li className="ml-2 lg:ml-4 relative md:inline-block hidden">
                            <Link to={'/'}>
                                {currentUser?.name ? (
                                    <div className="flex items-center font-semibold text-sm">
                                        <UserMenu />
                                        {currentUser.name
                                            .split('')
                                            .map((value, index) =>
                                                index === 0
                                                    ? value.toUpperCase()
                                                    : value
                                            )
                                            .join('')}
                                    </div>
                                ) : (
                                    <CircleUserRound className="h-10 p-2 w-10 text-gray-500 hover:text-gray-600" />
                                )}
                            </Link>
                        </li>
                        <div className="md:hidden">
                            <HumburgerMenu />
                        </div>
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

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.currentTarget.value) {
                const url = `/product?q=${e.currentTarget.value}&sf=`;
                navigate(url);
            }
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(() => e.target.value);
    };
    return (
        <>
            <Input
                value={term}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                className="focus-visible:ring-0 border border-l-input border-r-0 border-y-0 focus-visible:ring-offset-0  md:rounded-none text-xs md:text-base "
                type="text"
                placeholder="Cari product disini..."
            />
        </>
    );
};

export default Navbar;
