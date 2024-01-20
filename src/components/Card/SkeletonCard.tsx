import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '../ui/card';

const SkeletonCard = () => {
    return (
        <div className="w-full h-full">
            <Card className="min-w-[100px] h-[273px]  rounded-md overflow-hidden ">
                <Skeleton className="object-cover h-[200px] w-[400px] bg-gray-300 rounded-none" />
                <hr />
                <CardContent className="text-center p-4 flex items-center justify-center gap-2 flex-col">
                    <Skeleton className="h-2 w-full bg-gray-300 " />
                    <Skeleton className="h-2 w-full " />
                </CardContent>
            </Card>
        </div>
    );
};

export default SkeletonCard;
