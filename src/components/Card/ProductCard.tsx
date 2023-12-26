import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { memo } from 'react';

type CardProps = React.ComponentProps<typeof Card>;

type ProductCardProps = CardProps & {
    name: string;
    src: string;
    price: number;
    slug?: string;
};

const ProductCard = memo(({ name, src, price, slug }: ProductCardProps) => {
    const navigate = useNavigate();
    const handleProductClick = () => {
        const productData = {
            name,
            src,
            price
        };
        navigate(`/product/${slug}`, { state: { productData } });
    };
    return (
        <div className="h-full cursor-pointer" onClick={handleProductClick}>
            <Card className="w-full h-full md:min-w-[100px] md:min-h-[257.844px] rounded-lg overflow-hidden hover:border-amber-500">
                <CardHeader className="p-0">
                    <img
                        className="object-cover w-full"
                        height={512}
                        width={512}
                        src={`${import.meta.env.VITE_DEVELOPE_API_IMG}/${src}`}
                        alt="card-img"
                        loading="lazy"
                    />
                </CardHeader>

                <hr />
                <CardContent className="py-4 px-2 md:p-2">
                    <p className="font-medium text-xs line-claps-with-ellipsis">
                        {name}
                    </p>
                    <h3 className="text-base font-bold break-words">
                        Rp
                        {price?.toLocaleString('id-ID', {
                            currency: 'IDR'
                        })}
                    </h3>
                </CardContent>
            </Card>
        </div>
    );
});

export default ProductCard;
