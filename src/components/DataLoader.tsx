import SkeletonCard from './Card/SkeletonCard';

type DataLoaderProps = {
    isLoading: boolean;
    children: React.ReactNode;
    dataCount?: number;
};

const DataLoader: React.FC<DataLoaderProps> = ({
    isLoading,
    children,
    dataCount = 10
}) => {
    const renderSkeleton = () => {
        return Array.from({ length: dataCount }, (_, index) => (
            <SkeletonCard key={index} />
        ));
    };

    return isLoading ? <>{renderSkeleton()}</> : <>{children}</>;
};

export default DataLoader;
