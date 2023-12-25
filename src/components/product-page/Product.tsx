import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import OrderBox from './OrderBox';
import { Filter } from './product-type';
import FilterComponent from './FilterComponent';
import ProductSection from './ProductSection';

const Product = () => {
    const [queryParameters] = useSearchParams();

    const [filter, setFilter] = useState<Filter>({
        term: queryParameters.get('q'),
        category_id: queryParameters.get('category_id'),
        page: queryParameters.get('page'),
        min: queryParameters.get('min'),
        max: queryParameters.get('max'),
        sf: queryParameters.get('sf'),
        so: queryParameters.get('so')
    });

    useEffect(() => {
        const initialFilterState = {
            term: queryParameters.get('q'),
            category_id: queryParameters.get('category_id'),
            page: queryParameters.get('page'),
            min: queryParameters.get('min'),
            max: queryParameters.get('max'),
            sf: queryParameters.get('sf'),
            so: queryParameters.get('so')
        };
        {
            setFilter((current) => ({
                ...current,
                ...initialFilterState
            }));
        }
    }, [queryParameters]);

    return (
        <div className="h-full w-full flex">
            <FilterComponent filter={filter} />
            <ProductSection filter={filter}>
                <div className="font-bold xl:hidden">Filter</div>
                <OrderBox />
            </ProductSection>
        </div>
    );
};

export default Product;
