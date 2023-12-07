import Navbar from '@/components/Navbar';
import useNavScroll from '@/hook/useNavScroll';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { isSticky } = useNavScroll();
    return (
        <div className="w-full h-full">
            <Navbar
                stikyNavBar={isSticky}
                className=" shadow-sm shadow-gray-200 "
            />
            <div
                className={
                    'h-full w-full transition-all ease-in-out duration-300  mt-[135px]'
                }
            >
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
