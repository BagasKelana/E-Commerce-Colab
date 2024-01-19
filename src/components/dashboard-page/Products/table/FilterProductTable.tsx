import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { ChevronDown, Plus } from 'lucide-react';

import { Link, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import FilterProductCategory from './FilterProductCategory';
import { DropdownMenuTrigger as DropdownMenuCategory } from '@/components/ui/dropdown-menu';

const FilterProductTable = ({ isLoading }: { isLoading: boolean }) => {
    const [queryParameters, setQueryParams] = useSearchParams();

    const debounced = useDebouncedCallback((value) => {
        queryParameters.set('q', value);

        setQueryParams(queryParameters);
    }, 500);

    return (
        <div className="w-full flex flex-col px-8 py-6">
            <h1>Products</h1>
            <div className="flex w-full gap-4 py-4">
                <Input
                    placeholder="Search Product..."
                    onChange={(e) => debounced(e.target.value)}
                    className="max-w-sm"
                />

                <div>
                    <FilterProductCategory>
                        <DropdownMenuCategory
                            disabled={isLoading}
                            className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none focus-visible:border-0 ml-auto"
                            asChild
                        >
                            <Button variant="outline" className="ml-auto">
                                Category
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuCategory>
                    </FilterProductCategory>
                </div>
            </div>
            <div className="w-full">
                <Link to={'/dashboard-admin/update-product'}>
                    <Button className="text-xs w-36 h-10" variant="primery">
                        <span className="flex items-center">
                            <Plus className="w-4 h-4 font-semibold  mr-1" />
                            <span>Add Product</span>
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default FilterProductTable;
