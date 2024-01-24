import { useSelector } from 'react-redux';
import { ShoppingCart, SearchIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { Input } from '@/components/ui/input';
import { RootState } from '@/redux/store';
import { UserMenu } from './navbar/UserMenu';
import HumburgerMenu from './navbar/HumburgerMenu';
import { ProductCategoriesContext } from '@/ProductCategories';

const Navbar = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const { data } = useContext(ProductCategoriesContext);

    const nameLength = currentUser?.name.length ?? 0;

    const formattedName =
        nameLength > 6
            ? currentUser?.name
                  .split('')
                  .map((value, index) =>
                      index === 0 ? value.toUpperCase() : value
                  )
                  .join('')
                  .substring(0, 6)
            : currentUser?.name;

    const ariaLabel = `View profile for ${currentUser?.name}`;

    return (
        <header className="bg-gradient-to-l from-teal-700 to-teal-800 min-w-full w-screen top-0 fixed z-[50] md:h-[110px]">
            <div className="container mx-auto px-4 md:px-8 pt-4 pb-4 md:pt-8 md:pb-0 flex items-center justify-between md:justify-start">
                <div className="flex-shrink-0 hidden md:flex mr-8 ">
                    <Link to="/">
                        <img
                            className="h-10 object-cover brightness-0 invert"
                            src="/images/shopee-logo-31408.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <SearchBar />
                <nav className="contents">
                    <ul className="ml-4 xl:w-48 flex items-center justify-end">
                        <li className="relative inline-block">
                            <Link
                                to="/"
                                aria-label="Shopping Cart with 20 items"
                            >
                                <div
                                    className="absolute -top-0 right-0 z-10 text-lime-700 bg-white text-xs font-semibold p-0.5 rounded-full"
                                    aria-hidden="true"
                                >
                                    20
                                </div>
                                <span className="sr-only">Shopping Cart</span>
                                <ShoppingCart
                                    className="w-10 h-10 px-2 text-slate-100"
                                    aria-hidden="true"
                                />
                            </Link>
                        </li>
                        <li className="relative ml-2 lg:ml-4 md:inline-block hidden">
                            <svg height="20" width="1">
                                <line
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="20"
                                    style={{ stroke: 'white', strokeWidth: 1 }}
                                />
                            </svg>
                        </li>
                        <li className="ml-2 lg:ml-4 relative md:inline-block hidden">
                            {currentUser?.name ? (
                                <div className="flex items-center font-semibold text-sm text-slate-100">
                                    <UserMenu />
                                    <Link aria-label={ariaLabel} to={'/'}>
                                        <span
                                            className="whitespace-nowrap"
                                            aria-hidden="true"
                                        >
                                            {currentUser.name && formattedName}
                                            ...
                                        </span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link
                                        className="text-slate-100 px-2 border-white border"
                                        aria-label="Masuk"
                                        to={'/signin'}
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        className="text-teal-700 font-semibold px-2 bg-white "
                                        aria-label="Daftar"
                                        to={'/signup'}
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </li>
                        <HumburgerMenu />
                    </ul>
                </nav>
            </div>
            <div className="w-full px-8 py-2 hidden md:flex items-center justify-center space-x-5 text-slate-200 text-sm">
                {data?.data.map((category, index) => (
                    <div key={index}>{category.name}</div>
                ))}
            </div>
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
                const url = `/product?q=${e.currentTarget.value}`;
                navigate(url);
            }
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(() => e.target.value);
    };

    const handleOnClick = () => {
        if (term) {
            const url = `/product?q=${term}`;
            navigate(url);
        }
    };
    return (
        <div className="overflow-hidden group w-full max-w-xs md:max-w-full 2xl:max-w-3xl rounded-md flex items-center justify-between bg-white border border-input transition-all ease-in-out duration-200 mr-2 ">
            <label htmlFor="categories" className="sr-only">
                Categories
            </label>
            <select
                className="bg-transparent uppercase font-medium text-sm p-0 mx-0 group:focus-within:p-2 group-focus-within:mx-2 hidden lg:block group-focus-within:max-w-[150px] max-w-[0px]  scale-y-100 group-focus-within:scale-x-100 scale-x-0 origin-left transition-all duration-300 ease-in-out"
                name="categories"
                id="categories"
            >
                <option value="" disabled>
                    Select a category
                </option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
            </select>
            <Input
                value={term}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                className="focus-visible:ring-0 border border-l-input border-r-0 border-y-0 md:rounded-none text-xs md:text-base bg-white"
                type="text"
                placeholder="Cari product disini..."
            />
            <button
                type="button"
                aria-label="search button with search icon"
                onClick={handleOnClick}
                className="group/search-icon ml-auto px-2 md:px-4 text-teal-700 py-2 cursor-pointer"
            >
                <SearchIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Navbar;
