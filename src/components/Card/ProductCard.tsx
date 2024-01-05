import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

type ProductCardProps = CardProps & {
    name: string;
    src: string;
    price: number;
    slug?: string;
};

const ProductCard = ({ name, src, price, slug }: ProductCardProps) => {
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
            <Card className="w-full md:min-w-[100px] h-[273px] rounded-lg overflow-hidden hover:border-teal-700 shadow-sm shadow-gray-300">
                <CardHeader className="p-0">
                    <img
                        className="object-cover w-full h-[200px]"
                        height={512}
                        width={512}
                        // src={`/images/product/1ee9fd68-309c-473f-b5f9-b28c13c59d7b.png`}
                        src={`${import.meta.env.VITE_DEVELOPE_API_IMG}/${src}`}
                        alt="card-img"
                        loading="lazy"
                    />
                </CardHeader>

                <hr />
                <CardContent className="py-4 px-2 md:p-2  h-full">
                    <p className="font-medium text-xs line-claps-with-ellipsis">
                        {name}
                    </p>
                    <h2 className="text-base font-bold break-words">
                        Rp
                        {price?.toLocaleString('id-ID', {
                            currency: 'IDR'
                        })}
                    </h2>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductCard;
