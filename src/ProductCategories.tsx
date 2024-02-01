import { createContext } from 'react';

import useFetch, { FetchAllCategory, FetchErrorType } from './hook/useFetch';

type ProductCategoriesType = {
  data: FetchAllCategory | null;
  loading: boolean;
  error: FetchErrorType;
};

export const ProductCategoriesContext = createContext<ProductCategoriesType>({
  data: null,
  loading: true,
  error: null
});

const ProductCategories = ({ children }: { children: React.ReactNode }) => {
  const url = `${import.meta.env.VITE_DEVELOPE_API}/category`;

  const { data, loading, error } = useFetch<FetchAllCategory>(url, null);

  return (
    <ProductCategoriesContext.Provider value={{ data, loading, error }}>
      {children}
    </ProductCategoriesContext.Provider>
  );
};

export default ProductCategories;
