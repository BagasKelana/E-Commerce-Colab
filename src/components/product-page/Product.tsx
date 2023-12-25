import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import OrderBox from './OrderBox';
import { Filter } from './product-type';
import FilterComponent from './FilterComponent';
import ProductSection from './ProductSection';

const Product = () => {
    const [queryParameters] = useSearchParams();
    const [url, setUrl] = useState('');

    const [filter, setFilter] = useState<Filter>({
        category_id: '',
        min: '',
        max: '',
        sf: '',
        so: '',
        page: ''
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const initialFilterState = {
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
