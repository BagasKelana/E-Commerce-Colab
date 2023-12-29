import { useContext, useMemo } from 'react';
import { Button } from '../ui/button';
import { useSearchParams } from 'react-router-dom';
import { Filter } from './product-type';
import { ProductCategoriesContext } from '@/ProductCategories';

const DeleteFilterProduct = ({ filterProduct }: { filterProduct: Filter }) => {
    const { data } = useContext(ProductCategoriesContext);
    const [queryParameters, setQueryParameters] = useSearchParams();
    const filter = useMemo(() => filterProduct, [filterProduct]);

    const handleDeleteFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget.textContent;

        if (target === 'Hapus Semua') {
            queryParameters.delete('category_id');
            queryParameters.delete('max');
            queryParameters.delete('min');

            return setQueryParameters(queryParameters);
        }

        if (target === 'Harga Minimum' || target === 'Harga Maksimum') {
            if (target === 'Harga Maksimum') {
                queryParameters.delete('max');
                return setQueryParameters(queryParameters);
            }

            queryParameters.delete('min');
            return setQueryParameters(queryParameters);
        }

        queryParameters.delete('category_id');
        return setQueryParameters(queryParameters);
    };

    const kotak = [];
    if (data && filter.category_id) {
        const categories = data?.data;
        console.log(categories);
        const filterCategory = categories.filter(
            (category) => category.id === Number(filter.category_id)
        );
        const [category] = filterCategory;
        category?.name &&
            kotak.push(
                <Button
                    type="button"
                    variant={'outline'}
                    key={category?.name}
                    onClick={handleDeleteFilter}
                    className="text-gray-500"
                >
                    {category?.name}
                </Button>
            );
    }
    if (data && (filter.min || filter.max)) {
        filter.min &&
            kotak.push(
                <Button
                    type="button"
                    variant={'outline'}
                    key={'Harga Minimum'}
                    onClick={handleDeleteFilter}
                    className="text-gray-500"
                >
                    Harga Minimum
                </Button>
            );
        filter.max &&
            kotak.push(
                <Button
                    variant={'outline'}
                    key={'Harga Maksimum'}
                    onClick={handleDeleteFilter}
                    className="text-gray-500"
                >
                    Harga Maksimum
                </Button>
            );
    }

    kotak.length &&
        kotak.push(
            <Button
                className="hover:bg-transparent px-1 text-teal-700 hover:text-teal-700/90"
                variant={'ghost'}
                key={'Hapus Semua'}
                onClick={handleDeleteFilter}
            >
                Hapus Semua
            </Button>
        );

    return kotak.length ? kotak.map((kota) => kota) : null;
};

export default DeleteFilterProduct;
