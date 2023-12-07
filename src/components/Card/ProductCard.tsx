import { cn } from '@/lib/utils';

import { Card, CardContent } from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

type ProductCardProps = CardProps & {
    name: string;
    src: string;
    price: number;
    className?: string;
};

const ProductCard = ({ className, name, src, price }: ProductCardProps) => {
    return (
        <div className={cn('inline-block w-full  ', className)}>
            <div className=" relative min-w-full">
                <div className="h-full ">
                    <Card className=" min-w-[100px] h-[257.844px]  rounded-md">
                        <img
                            className="object-cover w-full"
                            height={512}
                            width={512}
                            src={src}
                            alt="card-img"
                            loading="lazy"
                        />

                        <hr />
                        <CardContent className="p-2">
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
            </div>
        </div>
    );
};

export default ProductCard;
