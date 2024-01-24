import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Link, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import FilterProductCategory from './FilterProductCategory';

const FilterProductTable = ({ isLoading }: { isLoading: boolean }) => {
    const [queryParameters, setQueryParams] = useSearchParams();

    const debounced = useDebouncedCallback((value) => {
        queryParameters.set('q', value);

        setQueryParams(queryParameters);
    }, 500);

    return (
        <div className="flex flex-col">
            <div className="bg-white px-6 pt-4">
                <div className="w-full flex-col md:flex-row py-6 border-b flex gap-4">
                    <FilterProductCategory isLoading={isLoading} />
                    <Input
                        placeholder="Filter Min Price"
                        className="h-[50px]"
                    />
                    <Input
                        placeholder="Filter Max Price"
                        className="h-[50px]"
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full gap-4 py-6 justify-between">
                    <Input
                        placeholder="Search Product..."
                        onChange={(e) => debounced(e.target.value)}
                        className="w-full hover:border-slate-400"
                    />

                    <Link to={'/dashboard-admin/update-product'}>
                        <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-600/90  hover:to-teal-700/90 font-normal">
                            Add New Product
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FilterProductTable;
