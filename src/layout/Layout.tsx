import Navbar from '@/components/Navbar';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="w-full h-full ">
            <Navbar />
            <div className="h-full w-full transition-all ease-in-out duration-300 mt-[80px] md:mt-[123px]">
                <main className="w-full h-full">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
