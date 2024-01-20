import { Input } from '@/components/ui/input';

import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const FilterOrderTable = ({ isLoading }: { isLoading: boolean }) => {
    const [queryParameters, setQueryParams] = useSearchParams();
    console.log(isLoading);

    const debounced = useDebouncedCallback((value) => {
        queryParameters.set('q', value);

        setQueryParams(queryParameters);
    }, 500);

    return (
        <div className="w-full flex flex-col px-8 py-6">
            <h1>Orders</h1>
            <div className="flex w-full gap-4 py-4">
                <Input
                    placeholder="Search Order..."
                    onChange={(e) => debounced(e.target.value)}
                    className="max-w-sm"
                />
            </div>
        </div>
    );
};

export default FilterOrderTable;
