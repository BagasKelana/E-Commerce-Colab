import { fetchTasksTableColumnDefs } from './table/table-column-def-func';
import DataTable from './table/DataTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { CategoryAdmin, FetchAllCategoryAdminType } from '@/fetch';

import { useMemo, useTransition } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Toaster } from 'sonner';
import useFetchDataTable from '@/hook/useFetchDataTable';

export default function CategoryManagement() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const { data, isLoading, error, reFetchData } =
        useFetchDataTable<FetchAllCategoryAdminType>(
            'CATEGORY',
            null,
            currentUser?.token
        );

    const categories = data?.data ?? null;
    console.log(categories);
    const [isPending, startTransition] = useTransition();

    // Memoize the columns so they don't re-render on every render
    const columns = useMemo<ColumnDef<CategoryAdmin, unknown>[]>(
        () =>
            fetchTasksTableColumnDefs(
                isPending,
                startTransition,
                reFetchData,
                currentUser?.token
            ),
        [isPending, currentUser?.token, reFetchData]
    );

    return (
        <div className="w-full">
            {data?.data?.data && (
                <DataTable
                    isLoading={isLoading}
                    columns={columns}
                    data={data?.data?.data}
                    totalItem={data?.data.total}
                    nextPagination={data?.data.next_page_url}
                />
            )}
            <Toaster />
        </div>
    );
}
