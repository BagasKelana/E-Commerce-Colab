import { Card, CardContent, CardHeader } from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

type CategoriesCardProps = CardProps & {
    title: string;
    src: string;
};

const CategoriesCard = ({ title, src }: CategoriesCardProps) => {
    return (
        <Card>
            <CardHeader>
                <img
                    className="object-cover"
                    height={512}
                    width={512}
                    src={src}
                    alt="card-img"
                />
            </CardHeader>

            <hr />
            <CardContent className="text-center p-4">
                <h3 className="font-bold">{title}</h3>
            </CardContent>
        </Card>
    );
};

export default CategoriesCard;
