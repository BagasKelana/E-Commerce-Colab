import { createContext } from 'react';
import useFetch, { FetchAllCategory } from './hook/useFetch';

type ProductCategoriesType = {
    data: FetchAllCategory | null;
    loading: boolean;
};

export const ProductCategoriesContext = createContext<ProductCategoriesType>({
    data: null,
    loading: true
});

const ProductCategories = ({ children }: { children: React.ReactNode }) => {
    const { data, loading } = useFetch<FetchAllCategory>(
        `${import.meta.env.VITE_DEVELOPE_API}/category`,
        null
    );

    return (
        <ProductCategoriesContext.Provider value={{ data, loading }}>
            {children}
        </ProductCategoriesContext.Provider>
    );
};

export default ProductCategories;
