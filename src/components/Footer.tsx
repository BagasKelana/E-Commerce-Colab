import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900">
            <div className="container flex flex-col flex-wrap px-4 py-4 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
                <div className="flex-shrink-0 pt-3 md:pt-5 w-64 mx-auto text-center md:mx-0 md:text-left">
                    <Link to={'/'} className="text-2xl text-white">
                        Email
                    </Link>
                    <p className="pt-5 md:pt-2 text-xs text-justify text-gray-400">
                        Bantuan dan Saran
                    </p>
                    <div className="flex pt-4 flex-col gap-4">
                        <Input type="email" placeholder="Email" />
                        <Button variant="destructive">Subscribe</Button>
                    </div>
                    <div className="flex justify-center pt-6 md:pt-3 gap-8 lg:mt-2">
                        <Link to={''}>
                            <Facebook className='text-white' />
                        </Link>
                        <Link to={''}>
                            <Twitter className="text-white" />
                        </Link>
                        <Link to={''}>
                            <Instagram className="text-white" />
                        </Link>
                        <Link to={''}>
                            <Linkedin className="text-white" />
                        </Link>
                    </div>
                </div>
                <div className="justify-between pl-14 md:text-left w-full mt-4 lg:flex">
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Customer Service
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Help Desk
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Support 24/7
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Shopee Community
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 text-left lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Tentang Tokopedia
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Karir
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Hak Kekayaan Intelektual
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Mitra
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full text-left px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest  text-gray-100">
                            Bantuan dan Panduan
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Shopee care
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="text-gray-300">
                                    Syarat dan Ketentuan
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center pb-10 pt-2">
                <p className="text-center text-white">@2024 Titik & Lana.</p>
            </div>
        </footer>
    );
}
