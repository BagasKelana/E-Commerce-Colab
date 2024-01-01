import { Skeleton } from '../ui/skeleton';

const SkeletonFilter = () => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-[416px] rounded-md overflow-hidden ">
                <div className="flex w-full gap-4 px-2 py-3">
                    <Skeleton className="h-8 w-5/6 bg-gray-300" />
                    <Skeleton className="h-8 w-1/6 bg-gray-300 rounded-full" />
                </div>

                <div className="text-center p-4 pt-2 pl-6 flex items-center justify-center gap-4 flex-col">
                    <Skeleton className="h-5 w-full bg-gray-300 " />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full bg-gray-300 " />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full bg-gray-300 " />
                </div>
                <div className="flex w-full gap-4 px-2 py-3">
                    <Skeleton className="h-8 w-5/6 bg-gray-300" />
                    <Skeleton className="h-8 w-1/6 bg-gray-300 rounded-full" />
                </div>

                <div className="text-center p-4 pt-2 pl-6 flex items-center justify-center gap-4 flex-col">
                    <Skeleton className="h-8 w-full bg-gray-300 " />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonFilter;
