import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { ChevronDown } from 'lucide-react';

import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import FilterCategoryTable from './FilterUserRoleTable';
import { DropdownMenuTrigger as DropdownMenuCategory } from '@/components/ui/dropdown-menu';
import AddUser from '../AddUser';

const FilterUserTable = ({ isLoading }: { isLoading: boolean }) => {
    const [queryParameters, setQueryParams] = useSearchParams();

    const debounced = useDebouncedCallback((value) => {
        queryParameters.set('q', value);

        setQueryParams(queryParameters);
    }, 500);

    return (
        <div className="w-full flex flex-col px-8 py-6">
            <h1>Users</h1>
            <div className="flex w-full gap-4 py-4">
                <Input
                    placeholder="Search User..."
                    onChange={(e) => debounced(e.target.value)}
                    className="max-w-sm"
                />

                <div>
                    <FilterCategoryTable>
                        <DropdownMenuCategory
                            disabled={isLoading}
                            className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none focus-visible:border-0 ml-auto"
                            asChild
                        >
                            <Button variant="outline" className="ml-auto">
                                User Role
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuCategory>
                    </FilterCategoryTable>
                </div>
            </div>
            <div className="w-full">
                <AddUser />
            </div>
        </div>
    );
};

export default FilterUserTable;
