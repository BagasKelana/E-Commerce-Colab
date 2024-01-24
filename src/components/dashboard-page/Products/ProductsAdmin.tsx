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
import FilterProductTable from './table/FilterProductTable';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function ProductAdmin() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const { data: categoryProduct } = useContext(ProductCategoriesContext);

    const { data, isLoading, error, reFetchData } =
        useFetchDataTable<ProductType>('PRODUCT', null, currentUser?.token);

    const products = data?.data ?? null;

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
        <div className="flex flex-col px-4 py-6  gap-6">
            <ErrorBoundary errorMessages={error?.message}>
                <DataTable
                    isLoading={isLoading}
                    columns={columns}
                    data={products?.data ?? []}
                    totalProduct={products?.total}
                    nextPagination={products?.next_page_url}
                />
                <Toaster />
            </ErrorBoundary>
        </div>
    );
}
