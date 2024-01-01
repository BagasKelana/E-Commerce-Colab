import { useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter } from 'lucide-react';

import { cn } from '@/lib/utils';
import FilterList from './FilterList';
import { Input } from '../ui/input';

import { Filter as FilterProps } from './product-type';
import { ProductCategoriesContext } from '@/ProductCategories';
import SkeletonFilter from '../Card/SkeletonFilter';

type FilterComponentPro = {
    categoriesFilter: FilterProps;
    isLoading: boolean;
};

const FilterComponent: React.FC<FilterComponentPro> = ({
    categoriesFilter,
    isLoading
}) => {
    const { data, loading } = useContext(ProductCategoriesContext);
    const [queryParameters, setQueryParameters] = useSearchParams();
    const [showFilter, setShowFilter] = useState({
        categories: true,
        price: true
    });

    const filter = useMemo(() => categoriesFilter, [categoriesFilter]);

    const [price, setPrice] = useState({
        min: filter.min
            ? new Intl.NumberFormat('id-ID').format(+filter.min)
            : '',
        max: filter.max
            ? new Intl.NumberFormat('id-ID').format(+filter.max)
            : '',
        errorMessage: ''
    });

    const handleShowCategoris = () => {
        setShowFilter((value) => {
            return { ...value, categories: !value.categories };
        });
    };

    const handleShowPrice = () => {
        setShowFilter((value) => {
            return { ...value, price: !value.price };
        });
    };

    const filterCategories = (
        event: React.MouseEvent & {
            target: HTMLLIElement;
        }
    ) => {
        if (event.target.id === filter.category_id) {
            queryParameters.delete('category_id');
            return setQueryParameters(queryParameters);
        }
        queryParameters.delete('page');
        queryParameters.set('category_id', event.target.id);
        return setQueryParameters(queryParameters);
    };

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = convertToNumber(e.target.value);

        if (value > 0) {
            const formattedValue = formatCurrency(value);
            if (e.target.id === 'min') {
                return setPrice((current) => ({
                    ...current,
                    min: formattedValue
                }));
            }

            return setPrice((current) => ({
                ...current,
                max: formattedValue
            }));
        } else {
            if (e.target.id === 'min') {
                return setPrice((current) => ({
                    ...current,
                    min: ''
                }));
            }

            return setPrice((current) => ({
                ...current,
                max: ''
            }));
        }
    };

    const formatCurrency = (value: number) => {
        const formatter = new Intl.NumberFormat('id-ID');
        return formatter.format(value);
    };

    function convertToNumber(input: string) {
        const cleanedInput = input.replace(/\./g, '');
        const sanitizedInput = cleanedInput.replace(',', '.');
        const result = parseFloat(sanitizedInput);

        return isNaN(result) ? 0 : result;
    }

    const handleInputMin = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            if (filter.min !== e.target.value) {
                queryParameters.set('min', String(convertToNumber(price.min)));
                setQueryParameters(queryParameters);
            }
        } else {
            queryParameters.delete('min');
            setQueryParameters(queryParameters);
        }

        queryParameters.delete('page');
    };

    const handleInputMax = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            if (filter.max !== e.target.value) {
                queryParameters.set('max', String(convertToNumber(price.max)));
                setQueryParameters(queryParameters);
            }
        } else {
            queryParameters.delete('max');
            setQueryParameters(queryParameters);
        }

        queryParameters.delete('page');
    };

    return (
        <div className="hidden h-full w-1/5 flex-col gap-4 xl:flex ">
            <div className="whitespace-nowrap flex items-center ">
                <Filter className="w-4 h-4 mr-2" />
                <h3 className="font-semibold">FILTER</h3>
            </div>
            <div className="h-full w-full border border-input shadow-sm shadow-slate-200">
                {loading ? (
                    <SkeletonFilter />
                ) : (
                    <div className="flex w-full flex-col pb-4">
                        <>
                            <button
                                onClick={handleShowCategoris}
                                className="flex cursor-pointer items-center justify-between p-2 w-full "
                            >
                                <div className="font-semibold">Categories</div>
                                <span
                                    className={cn(
                                        'transition-all duration-150 ease-in-out -rotate-180 rounded-full bg-teal-600/80 text-white',
                                        !showFilter.categories && 'rotate-0'
                                    )}
                                >
                                    <ChevronDown />
                                </span>
                            </button>
                            <ul
                                className={cn(
                                    'ml-5 px-2 gap-2 flex origin-top flex-col text-sm transition-all duration-200 ease-in-out max-h-[400px] scale-y-100',
                                    !showFilter.categories &&
                                        'max-h-[0px] scale-y-0'
                                )}
                            >
                                {data?.data?.map((category, index) => {
                                    return `${category.id}` ===
                                        filter.category_id ? (
                                        <FilterList
                                            isLoading={isLoading}
                                            className={'font-bold text-black'}
                                            key={category.slug}
                                            onClick={filterCategories}
                                            id={`${category.id}`}
                                        >
                                            {category.name}
                                        </FilterList>
                                    ) : (
                                        <FilterList
                                            isLoading={isLoading}
                                            key={index}
                                            onClick={filterCategories}
                                            id={`${category.id}`}
                                        >
                                            {category.name}
                                        </FilterList>
                                    );
                                })}
                            </ul>
                        </>
                        <>
                            <button
                                onClick={handleShowPrice}
                                className="flex cursor-pointer items-center justify-between p-2 w-full "
                            >
                                <div className="font-semibold">Price</div>
                                <span
                                    className={cn(
                                        'transition-all duration-150 ease-in-out -rotate-180 rounded-full bg-teal-600/80 text-white',
                                        !showFilter.price && 'rotate-0'
                                    )}
                                >
                                    <ChevronDown />
                                </span>
                            </button>
                            <div
                                className={cn(
                                    'ml-2 mt-1 flex origin-top flex-col overflow-auto text-sm transition-all duration-200 ease-in-out max-h-[180px] scale-y-100',
                                    !showFilter.price &&
                                        ' max-h-[0px] scale-y-0 mt-0'
                                )}
                            >
                                <div className="w-full flex flex-col gap-2 py-2 px-2">
                                    <Input
                                        disabled={isLoading}
                                        onBlur={handleInputMin}
                                        onChange={handleChangePrice}
                                        className="rounded-lg focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:ring-offset-0"
                                        id="min"
                                        name="min"
                                        data-type="currency"
                                        type="text"
                                        placeholder="Min Price"
                                        value={price.min}
                                    />
                                    <Input
                                        disabled={isLoading}
                                        onBlur={handleInputMax}
                                        onChange={handleChangePrice}
                                        id="max"
                                        name="max"
                                        data-type="currency"
                                        type="text"
                                        placeholder="Max Price"
                                        value={price.max}
                                        className="rounded-lg focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:ring-offset-0"
                                    />
                                    {price.errorMessage && (
                                        <span className="text-rose-500 text-xs">
                                            {price.errorMessage}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterComponent;
