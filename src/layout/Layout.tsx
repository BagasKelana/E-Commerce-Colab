import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="h-full px-0 container transition-all ease-out duration-200 mt-[74px] md:mt-[110px]">
        <main
          className={cn(
            'h-full w-full flex flex-col gap-6 py-2 md:py-4',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
