import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

type LayoutProps = {
    children: React.ReactNode;
    className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
    return (
        <div className={cn('w-full h-full ', className)}>
            <Navbar />
            <div className="h-full w-full transition-all ease-in-out duration-300 mt-[80px] md:mt-[110px]">
                <main className="w-full h-full">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
