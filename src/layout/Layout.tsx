import Navbar from '@/components/Navbar';
import useNavScroll from '@/hook/useNavScroll';
import { cn } from '@/lib/utils';

type LayoutProps = {
    children: React.ReactNode;
    bgColor?: string;
};

const Layout = ({ children, bgColor }: LayoutProps) => {
    const { isSticky } = useNavScroll();
    return (
        <div className="w-full h-full ">
            <Navbar
                stikyNavBar={isSticky}
                className=" shadow-sm shadow-gray-200 "
            />
            <div
                className={cn(
                    'h-full w-full transition-all ease-in-out duration-300 mt-[123px]',
                    bgColor
                )}
            >
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
