import SkeletonCard from './Card/SkeletonCard';
import SpinnerLoading from './ui/spinner';

type DataLoaderProps = {
    isLoading: boolean;
    children: React.ReactNode;
    dataCount?: number;
    spinner?: boolean;
    className?: string;
};

const DataLoader: React.FC<DataLoaderProps> = ({
    isLoading,
    children,
    dataCount = 10,
    spinner,
    className
}) => {
    if (spinner) {
        return isLoading ? (
            <div className="h-[200px] flex items-center justify-center">
                <SpinnerLoading className={className} />
            </div>
        ) : (
            <>{children}</>
        );
    }
    const renderSkeleton = () => {
        return Array.from({ length: dataCount }, (_, index) => (
            <SkeletonCard key={index} />
        ));
    };

    return isLoading ? <>{renderSkeleton()}</> : <>{children}</>;
};

export default DataLoader;
