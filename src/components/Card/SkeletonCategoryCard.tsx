import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '../ui/card';

const SkeletonCategoryCard = () => {
    return (
        <div className="w-full h-full">
            <Card className="overflow-hidden">
                <Skeleton className="object-cover h-[200px] w-[400px] bg-gray-300 rounded-none" />
                <hr />
                <CardContent className="text-center p-4 flex items-center justify-center gap-2 flex-col">
                    <Skeleton className="h-4 w-full bg-gray-300 " />
                </CardContent>
            </Card>
        </div>
    );
};

export default SkeletonCategoryCard;
