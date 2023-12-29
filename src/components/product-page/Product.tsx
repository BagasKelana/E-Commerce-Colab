import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Filter } from './product-type';
import FilterComponent from './FilterComponent';
import ProductSection from './ProductSection';
import { FetchAllProduct } from '@/hook/useFetch';

import axios, { AxiosError, AxiosResponse } from 'axios';

import DeleteFilterProduct from './DeleteFilterProduct';

const Product = () => {
    const [productData, setProductData] = useState<FetchAllProduct | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorProduct, setErrorProduct] = useState<AxiosError | null>(null);
    const [queryParameters] = useSearchParams();
    const [filter, setFilter] = useState<Filter>({});

    useEffect(() => {
        const urlParams = new URLSearchParams(queryParameters);

        const initialFilterState = {
            term: queryParameters.get('q'),
            category_id: queryParameters.get('category_id'),
            min: queryParameters.get('min'),
            max: queryParameters.get('max'),
            sf: queryParameters.get('sf'),
            so: queryParameters.get('so'),
            page: queryParameters.get('page')
        };

        setFilter((current) => ({
            ...current,
            ...initialFilterState
        }));

        const searchQuery = urlParams.toString();
        const controller = new AbortController();
        const { signal } = controller;

        const url = `${
            import.meta.env.VITE_DEVELOPE_API
        }/product?${searchQuery}`;

        const fetchData = async (url: string) => {
            try {
                setIsLoading(true);
                const res: AxiosResponse | null = await axios.get(url, {
                    signal
                });

                if (res?.data) {
                    setProductData(res.data);
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

        return () => controller.abort();
    }, [queryParameters]);

    return (
        <div className="h-full w-full flex gap-6 mb-4">
            <FilterComponent isLoading={isLoading} categoriesFilter={filter} />
            <ProductSection
                data={productData}
                loading={isLoading}
                error={errorProduct}
                term={filter.term}
            >
                <div className="flex items-center gap-2">
                    <DeleteFilterProduct filterProduct={filter} />
                </div>
            </ProductSection>
        </div>
    );
};

export default Product;
