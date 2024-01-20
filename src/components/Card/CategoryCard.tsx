import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';

type CardProps = React.ComponentProps<typeof Card>;

type CategoryCardProps = CardProps & {
    title: string;
    src: string;
    categoryId: string | number;
};

const CategoryCard = ({ title, src, categoryId }: CategoryCardProps) => {
    return (
        <Card>
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

            <CardContent
                draggable={false}
                className="text-center py-2 md:p-4 cursor-pointer "
            >
                <Link to={`/product?category_id=${categoryId}`}>
                    <span className="sr-only">category-name</span>
                    <h3 className="font-semibold hover:text-teal-700">
                        {title}
                    </h3>
                </Link>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
