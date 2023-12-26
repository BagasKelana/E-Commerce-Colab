import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import OrderBox from './OrderBox';
import { Filter } from './product-type';
import FilterComponent from './FilterComponent';
import ProductSection from './ProductSection';

const Product = () => {
    const [queryParameters] = useSearchParams();

    const [filter, setFilter] = useState<Filter>({
        term: '',
        category_id: '',
        min: '',
        max: '',
        sf: '',
        so: '',
        page: ''
    });
    const [url, setUrl] = useState<string | null>(queryParameters.toString());

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
        {
            setFilter((current) => ({
                ...current,
                ...initialFilterState
            }));
        }

        const searchQuery = urlParams.toString();

        setUrl(() => searchQuery);
    }, [queryParameters]);

    return (
        <div className="h-full w-full flex">
            <FilterComponent filter={filter} />
            <ProductSection url={url}>
                <div className="font-bold xl:hidden">Filter</div>
                <OrderBox />
            </ProductSection>
        </div>
    );
};

export default Product;
