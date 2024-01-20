import { fetchTasksTableColumnDefs } from './table/table-column-def-func';
import DataTable from './table/DataTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
    FetchAllProductAdmin as ProductType,
    ProductAdmin as ProductAdminProps
} from '@/fetch';

import { useContext, useMemo, useTransition } from 'react';

import { ProductCategoriesContext } from '@/ProductCategories';
import { ColumnDef } from '@tanstack/react-table';
import { Toaster } from 'sonner';
import useFetchDataTable from '@/hook/useFetchDataTable';

export default function ProductAdmin() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const { data: categoryProduct } = useContext(ProductCategoriesContext);

    const {
        data: productData,
        isLoading,
        error: errorProduct,
        reFetchData
    } = useFetchDataTable<ProductType>('PRODUCT', null, currentUser?.token);

    console.log(productData?.data);

    const [isPending, startTransition] = useTransition();

    // Memoize the columns so they don't re-render on every render
    const columns = useMemo<ColumnDef<ProductAdminProps, unknown>[]>(
        () =>
            fetchTasksTableColumnDefs(
                isPending,
                startTransition,
                categoryProduct,
                reFetchData,
                currentUser?.token
            ),
        [isPending, categoryProduct, currentUser?.token, reFetchData]
    );

    return (
        <>
            {errorProduct ? (
                <div>Maaf Terjadi Kendala</div>
            ) : (
                <div className="w-full ">
                    {productData?.data?.data && (
                        <DataTable
                            isLoading={isLoading}
                            columns={columns}
                            data={productData?.data?.data}
                            totalProduct={productData?.data.total}
                            nextPagination={productData?.data.next_page_url}
                        />
                    )}
                    <Toaster />
                </div>
            )}
        </>
    );
}
