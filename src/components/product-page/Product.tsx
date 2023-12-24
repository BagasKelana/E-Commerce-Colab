import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../Card/ProductCard';
import SkeletonCard from '../Card/SkeletonCard';
import OrderBox from './OrderBox';
import { Filter } from './product-type';
import FilterComponent from './FilterComponent';
import useFetch, { FetchAllProduct } from '@/hook/useFetch';

const Product: React.FC = () => {
    const [queryParameters] = useSearchParams();

    const [filter, setFilter] = useState<Filter>({
        term: queryParameters.get('q'),
        category_id: queryParameters.get('category_id'),
        page: queryParameters.get('page'),
        min: queryParameters.get('min'),
        max: queryParameters.get('max'),
        sf: queryParameters.get('sf')
    });

    useEffect(() => {
        const initialFilterState = {
            term: queryParameters.get('q'),
            category_id: queryParameters.get('category_id'),
            page: queryParameters.get('page'),
            min: queryParameters.get('min'),
            max: queryParameters.get('max'),
            sf: queryParameters.get('sf')
        };
        {
            setFilter((current) => ({
                ...current,
                ...initialFilterState
            }));
        }
    }, [queryParameters]);

    const querySearch = useMemo(() => {
        const { term, category_id, min, max, sf } = filter;
        // prettier-ignore
        const queryString = `?q=${term || ''}&category_id=${category_id || ''}${min ? `&min=${min}` : ''}${max ? `&max=${max}` : ''}${sf ? `&sf=${sf}` : ''}`;

        return queryString;
    }, [filter]);

    const { data, error, loading } = useFetch<FetchAllProduct>(
        `${import.meta.env.VITE_DEVELOPE_API}/product${querySearch}`,
        null
    );

    console.log(data);

    const renderSkeleton = () => {
        return Array.from({ length: 10 }, (_, index) => (
            <SkeletonCard key={index} />
        ));
    };

    return (
        <div className="w-full">
            <div className="flex h-full w-full ">
                <FilterComponent filter={filter} />
                {error ? (
                    <div className="w-5/6 min-h-[200px] flex items-center justify-center  text-3xl">
                        {' '}
                        Error Bos
                    </div>
                ) : (
                    <div className="w-4/5 h-full flex flex-col">
                        <div className="flex justify-end mb-4">
                            <OrderBox />
                        </div>
                        <section className="grid grid-cols-5 gap-x-4 gap-y-5  place-items-stretch mb-4 w-full">
                            {loading
                                ? renderSkeleton()
                                : data?.data?.data?.map((product) => (
                                      <ProductCard
                                          key={product.id}
                                          name={product.name}
                                          src={
                                              product.product_image?.[0]?.image
                                          }
                                          price={product.price}
                                      />
                                  ))}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
