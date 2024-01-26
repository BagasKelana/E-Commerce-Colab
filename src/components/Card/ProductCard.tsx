import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatRupiah } from '@/helpers/formatRupiah';
import { showImageAPI } from '@/helpers/showImageAPI';

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
        navigate(`/product/${slug}`);
    };
    return (
        <div className="h-full cursor-pointer" onClick={handleProductClick}>
            <Card className="w-full md:min-w-[100px] h-[273px] rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-100 ease-in-out shadow-border shadow-slate-200">
                <CardHeader className="p-0">
                    <img
                        className="object-cover w-full h-[200px] aspect-square"
                        height={512}
                        width={512}
                        src={showImageAPI(src)}
                        alt="card-img"
                        loading="lazy"
                    />
                </CardHeader>

                <hr />
                <CardContent className="py-4 px-2 md:p-2 h-full">
                    <p className="font-medium text-xs line-claps-with-ellipsis">
                        {name}
                    </p>
                    <h2 className="text-base font-bold break-words">
                        Rp
                        {formatRupiah(price)}
                    </h2>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductCard;
