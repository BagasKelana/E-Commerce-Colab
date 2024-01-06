import ProductCard from '../Card/ProductCard';
import { Button } from '../ui/button';

import { useEffect, useState } from 'react';
import { FetchAllProductfeatured } from '@/hook/useFetch';
import axios, { AxiosError, AxiosResponse } from 'axios';

const ProductSection = () => {
    const [productData, setProductData] =
        useState<FetchAllProductfeatured | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorProduct, setErrorProduct] = useState<AxiosError | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const url = `${
            import.meta.env.VITE_DEVELOPE_API
        }/product/featured?limit=12`;

        const fetchData = async (url: string) => {
            try {
                setIsLoading(true);
                const res: AxiosResponse | null = await axios.get(url, {
                    signal
                });

                if (res?.data) {
                    setProductData(res.data);
                    console.log(res.data);
                } else {
                    setProductData(null);
                }
            } catch (err: unknown) {
                if (signal.aborted) return;
                const error = err as AxiosError;
                setErrorProduct(error);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(url);
    }, []);

    return (
        <section className="w-full px-2 md:px-20 my-6">
            <div className="w-full p-2 mb-6 rounded shadow-sm shadow-gray-300 bg-slate-50">
                <h2 className="text-teal-700 text-center">RECOMMENDATION</h2>
            </div>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-5 place-items-stretch mb-4">
                {productData?.data?.map((product, index) => (
                    <ProductCard
                        key={index}
                        slug={product.slug}
                        name={product.name}
                        price={product.price}
                        src={product?.featured_image?.image || ''}
                    />
                ))}
            </section>
            <div className="w-full flex p-2 justify-center ">
                <Button className="bg-slate-50 text-black border-[1px] border-slate-200 hover:text-black/80 hover:bg-slate-50 ">
                    See More
                </Button>
            </div>
        </section>
    );
};

export default ProductSection;
