import Layout from '@/layout/Layout';
import { NavLink } from 'react-router-dom';

const Test = () => {
    return (
        <Layout>
            <div className="w-full pt-4">
                <div>
                    <h1>Halo</h1>
                </div>
                <section className="w-full md:px-20">
                    <ul className="w-full flex gap-4 justify-between">
                        <li className="w-full p-2 text-center">
                            <NavLink
                                reloadDocument={false}
                                className={({ isActive }) =>
                                    ` ${
                                        isActive
                                            ? 'transition-all duration-200 ease-in-out bg-teal-700 text-white p-4 rounded-md translate-x-32'
                                            : 'transition-all duration-200 ease-in-out text-red-700 translate-x-0'
                                    }`
                                }
                                to={'/test/my-product'}
                            >
                                My Product
                            </NavLink>
                        </li>
                        <li className="w-full p-2 text-center">
                            <NavLink
                                reloadDocument={false}
                                className={({ isActive }) =>
                                    ` ${
                                        isActive
                                            ? 'transition-all duration-200 ease-in-out bg-teal-700 text-white p-4 rounded-md translate-x-32'
                                            : 'transition-all duration-200 ease-in-out text-red-700 translate-x-0'
                                    }`
                                }
                                to={'/test/pesanan'}
                            >
                                Pesanan
                            </NavLink>
                        </li>
                    </ul>
                </section>
            </div>
        </Layout>
    );
};

export default Test;
