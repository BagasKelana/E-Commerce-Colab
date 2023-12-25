import { useMemo } from 'react';

import useFetch, { FetchAllProduct } from '@/hook/useFetch';
import SkeletonCard from '../Card/SkeletonCard';
import ErrorHandling from './ErrorHandling';
import ProductCard from '../Card/ProductCard';
import Pagination from './Pagination';
import { FilterComponentProps } from './product-type';

type ProductSectionProps = {
    children: React.ReactNode;
};

const ProductSection: React.FC<ProductSectionProps & FilterComponentProps> = ({
    filter,
    children
}) => {
    const querySearch = useMemo(() => {
        const { term, category_id, min, max, sf, so } = filter;

        const queryString =
            `?q=${term || ''}` +
            `${category_id ? `&category_id=${category_id}` : ''}` +
            `${min ? `&min=${min}` : ''}` +
            `${max ? `&max=${max}` : ''}` +
            `${sf ? `&sf=${sf}` : ''}` +
            `${so ? `&so=${so}` : ''}`;

        return queryString;
    }, [filter]);

    const { data, error, loading } = useFetch<FetchAllProduct>(
        `${import.meta.env.VITE_DEVELOPE_API}/product${querySearch}`,
        null
    );

    const renderSkeleton = () => {
        return Array.from({ length: 10 }, (_, index) => (
            <SkeletonCard key={index} />
        ));
    };

    console.log(data);
    return (
        <ErrorHandling error={error}>
            <div className="flex justify-between xl:justify-end items-center mb-4">
                {children}
            </div>
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-4 gap-y-5 place-items-stretch mb-4 w-full">
                {loading
                    ? renderSkeleton()
                    : data?.data?.data?.map((product) => (
                          <ProductCard
                              key={product.id}
                              name={product.name}
                              src={product.product_image?.[0]?.image}
                              price={product.price}
                          />
                      ))}
            </section>
            <div className="w-full flex justify-center py-4">
                <Pagination links={data?.data?.links} />
            </div>
        </ErrorHandling>
    );
};

export default ProductSection;
