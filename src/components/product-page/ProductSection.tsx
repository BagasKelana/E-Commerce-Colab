import useFetch, { FetchAllProduct } from '@/hook/useFetch';
import SkeletonCard from '../Card/SkeletonCard';
import ErrorHandling from './ErrorHandling';
import ProductCard from '../Card/ProductCard';
import Pagination from './Pagination';
import { useCallback } from 'react';

type ProductSectionProps = {
    children: React.ReactNode;
    url: string;
};

const ProductSection: React.FC<ProductSectionProps> = ({ children, url }) => {
    const { data, error, loading } = useFetch<FetchAllProduct>(
        `${import.meta.env.VITE_DEVELOPE_API}/product?${url}`,
        null
    );

    console.log(data)

    const renderSkeleton = useCallback(() => {
        return Array.from({ length: 10 }, (_, index) => (
            <SkeletonCard key={index} />
        ));
    }, []);

    const productRendering = () => {
        if (data?.data?.data) {
            if (data?.data?.data?.length > 0) {
                return data?.data?.data?.map((product) => (
                    <ProductCard
                        slug={product.slug}
                        key={product.slug}
                        name={product.name}
                        src={product.product_image?.[0]?.image}
                        price={product.price}
                    />
                ));
            }
            return (
                <div className="col-span-5 row-span-2 place-content-center justify-items-center">
                    Product Tidak Ditemukan
                </div>
            );
        }
    };

    return (
        <ErrorHandling error={error}>
            <div className="flex justify-between xl:justify-end items-center mb-4">
                {children}
            </div>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-4 gap-y-5 place-items-stretch mb-4 w-full">
                {loading ? renderSkeleton() : productRendering()}
            </section>
            <div className="w-full flex justify-center py-4">
                <Pagination url={'/product'} links={data?.data?.links} />
            </div>
        </ErrorHandling>
    );
};

export default ProductSection;
