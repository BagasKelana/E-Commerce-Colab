import { Input } from '@/components/ui/input';

import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import AddUser from '../AddCategory.tsx';

const FilterTable = ({ isLoading }: { isLoading: boolean }) => {
    const [queryParameters, setQueryParams] = useSearchParams();

    const debounced = useDebouncedCallback((value) => {
        queryParameters.set('q', value);

        setQueryParams(queryParameters);
    }, 500);

    return (
        <>
            <h1>Category</h1>
            <div className="flex w-full gap-4 py-4">
                <Input
                    placeholder="Search Category..."
                    onChange={(e) => debounced(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="w-full">
                <AddUser isDisabled={isLoading} />
            </div>
        </>
    );
};

export default FilterTable;
