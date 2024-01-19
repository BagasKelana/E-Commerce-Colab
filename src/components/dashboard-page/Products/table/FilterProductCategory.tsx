import { ProductCategoriesContext } from '@/ProductCategories';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu';

import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterProductCategory = ({ children }: { children: React.ReactNode }) => {
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
            return setCategoryId(() => '0');
        }

        setCategoryId(() => value);
        queryParameters.delete('page');
        queryParameters.set('category_id', value);
        setQueryParams(queryParameters);
    };

    return (
        <DropdownMenu>
            {children}

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
