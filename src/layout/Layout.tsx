import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import { cn } from '@/lib/utils';

type LayoutProps = {
    children: React.ReactNode;
    bgColor?: string;
};

const Layout = ({ children, bgColor }: LayoutProps) => {
    return (
        <div className="w-full h-full ">
            <Navbar />
            <div
                className={cn(
                    'h-full w-full transition-all ease-in-out duration-300 mt-[80px] md:mt-[123px]',
                    bgColor
                )}
            >
                <main className="w-full h-full">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
