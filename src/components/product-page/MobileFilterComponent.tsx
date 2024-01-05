import { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '../ui/drawer';
import { ProductCategoriesContext } from '@/ProductCategories';
import { Input } from '../ui/input';
import { useSearchParams } from 'react-router-dom';

const MobileFilterComponent = () => {
    const { data, loading } = useContext(ProductCategoriesContext);
    const [queryParameters, setQueryParameters] = useSearchParams();

    const [price, setPrice] = useState({
        min: '',
        max: '',
        errorMessage: ''
    });

    const [categories, setCategories] = useState(0);

    useEffect(() => {
        const currentPrice = {
            min: queryParameters.get('min'),
            max: queryParameters.get('max')
        };

        const currentCategory = queryParameters.get('category_id') || null;

        setPrice((current) => ({
            ...current,
            min: currentPrice.min
                ? new Intl.NumberFormat('id-ID').format(+currentPrice.min)
                : '',
            max: currentPrice.max
                ? new Intl.NumberFormat('id-ID').format(+currentPrice.max)
                : ''
        }));

        if (currentCategory) {
            setCategories(+currentCategory);
        } else {
            setCategories(0);
        }
    }, [queryParameters]);

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

    const applyFilter = () => {
        if (price.min) {
            queryParameters.set('min', String(convertToNumber(price.min)));
        } else {
            queryParameters.delete('min');
        }
        if (price.max) {
            queryParameters.set('max', String(convertToNumber(price.max)));
        } else {
            queryParameters.delete('max');
        }
        if (categories) {
            queryParameters.set('category_id', String(categories));
        } else {
            queryParameters.delete('category_id');
        }

        return setQueryParameters(queryParameters);
    };

    const handleOnClick = (categoryId: number) => {
        if (categoryId) {
            setCategories(categoryId);
        }
        return;
    };

    const resetFilter = () => {
        setCategories(0);
        setPrice((current) => ({
            ...current,
            min: '',
            max: ''
        }));
        queryParameters.delete('min');
        queryParameters.delete('max');
        queryParameters.delete('category_id');
        return setQueryParameters(queryParameters);
    };

    const resetState = () => {
        const filter = {
            min: queryParameters.get('min'),
            max: queryParameters.get('max'),
            category: queryParameters.get('category_id')
        };

        filter.category ? setCategories(+filter.category) : setCategories(0);

        if (filter.min || filter.max) {
            setPrice((current) => ({
                ...current,
                min: filter.min
                    ? new Intl.NumberFormat('id-ID').format(+filter.min)
                    : '',
                max: filter.max
                    ? new Intl.NumberFormat('id-ID').format(+filter.max)
                    : ''
            }));
        }
    };

    return (
        <Drawer dismissible={false} shouldScaleBackground={true}>
            <DrawerTrigger>Filter</DrawerTrigger>
            <DrawerContent>
                <DrawerClose
                    onClick={resetState}
                    className="bg-transparent h-[400px] w-screen -top-[400px] absolute"
                />
                <DrawerHeader>
                    <div className="w-full flex justify-between">
                        <DrawerTitle>Filter</DrawerTitle>
                        <DrawerTitle
                            typeof="button"
                            onClick={resetFilter}
                            className="font-medium text-base text-teal-700"
                        >
                            Reset
                        </DrawerTitle>
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    <div className="flex items-start flex-col w-full">
                        <DrawerTitle>Categories</DrawerTitle>
                        <div className="flex w-full flex-grow flex-wrap gap-2 pr-9 pt-2 mt-2">
                            {data?.data.map((category) => {
                                return categories &&
                                    categories === category.id ? (
                                    <Button
                                        onClick={() => {
                                            handleOnClick(category.id);
                                        }}
                                        key={category.slug}
                                        variant={'primery'}
                                    >
                                        {category.name}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            handleOnClick(category.id);
                                        }}
                                        key={category.slug}
                                        variant={'outline'}
                                    >
                                        {category.name}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-start flex-col w-full mt-4">
                        <DrawerTitle>Price</DrawerTitle>
                        <div className="w-full flex flex-col gap-2 py-2 px-2 mt-2 pr-8">
                            <Input
                                disabled={loading}
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
                                disabled={loading}
                                onChange={handleChangePrice}
                                id="max"
                                name="max"
                                data-type="currency"
                                type="text"
                                placeholder="Max Price"
                                className="rounded-lg focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:ring-offset-0"
                                value={price.max}
                            />
                        </div>
                    </div>
                    <DrawerClose
                        disabled={loading}
                        onClick={applyFilter}
                        className="mt-4 rounded-md bg-teal-700 hover:bg-teal-700/90  font-semibold text-white  p-4 "
                    >
                        Apply Filter
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default MobileFilterComponent;
