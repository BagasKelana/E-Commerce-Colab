import { ProductCategoriesContext } from '@/ProductCategories';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterProductCategory = ({ isLoading }: { isLoading: boolean }) => {
    const { data: categoriesProduct } = useContext(ProductCategoriesContext);
    const [queryParameters, setQueryParams] = useSearchParams();
    const [categoryId, setCategoryId] = useState('');

    const handleOnValueChange: ((value: string) => void) | undefined = (
        value
    ) => {
        if (categoryId === value) {
            queryParameters.delete('page');
            queryParameters.delete('category_id');
            setQueryParams(queryParameters);
            return setCategoryId(() => '');
        }

        setCategoryId(() => value);
        queryParameters.delete('page');
        queryParameters.set('category_id', value);
        setQueryParams(queryParameters);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger disabled={isLoading} asChild>
                <Button
                    variant="outline"
                    className=" w-full h-[50px] flex justify-between border-input text-slate-500 font-normal"
                >
                    {categoriesProduct?.data?.map((category) => {
                        return category.id === +categoryId ? (
                            <> {category.name}</>
                        ) : null;
                    })}
                    {!categoryId && 'Filter Category'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={categoryId}
                    onValueChange={handleOnValueChange}
                >
                    {categoriesProduct?.data?.map((category) => {
                        return (
                            <DropdownMenuRadioItem
                                key={category.slug}
                                value={String(category.id)}
                            >
                                {category.name}
                            </DropdownMenuRadioItem>
                        );
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FilterProductCategory;
