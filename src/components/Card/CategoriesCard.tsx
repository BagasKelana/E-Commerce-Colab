import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '../ui/separator';

type CardProps = React.ComponentProps<typeof Card>;

type CategoriesCardProps = CardProps & {
    title: string;
    src: string;
};

const CategoriesCard = ({ title, src }: CategoriesCardProps) => {
    return (
        <Card className="rounded-xl border-slate-400/80 ">
            <CardHeader>
                <img
                    className="object-cover aspect-square hover:scale-110 transition-all ease-in"
                    height={512}
                    width={512}
                    src={src}
                    alt="card-img"
                    loading="lazy"
                />
            </CardHeader>
            <Separator />
            <CardContent className="text-center py-2 md:p-4 ">
                <span className="sr-only">category-name</span>
                <h3 className="font-semibold text-">{title}</h3>
            </CardContent>
        </Card>
    );
};

export default CategoriesCard;
