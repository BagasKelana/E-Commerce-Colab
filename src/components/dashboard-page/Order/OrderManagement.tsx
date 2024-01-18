import { fetchTasksTableColumnDefs } from './table/table-column-def-func';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { FetchAllOrderAdminType, OrderAdminType } from '@/fetch';

import { useMemo, useTransition } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Toaster } from 'sonner';
import useFetchDataTable from '@/hook/useFetchDataTable';
import DataTable from './table/DataTable';

export default function OrderManagement() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const {
        data: OrderData,
        isLoading,
        error: errorOrder,
        reFetchData
    } = useFetchDataTable<FetchAllOrderAdminType>(
        'ORDER',
        null,
        currentUser?.token
    );
    const [isPending, startTransition] = useTransition();

    // Memoize the columns so they don't re-render on every render
    const columns = useMemo<ColumnDef<OrderAdminType, unknown>[]>(
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
        <>
            {errorOrder ? (
                <div className="min-h-screen h-full flex justify-center items-center">
                    <h1>An Unexpected Error Occurred</h1>
                </div>
            ) : (
                <div className="w-full ">
                    {OrderData?.data?.data && (
                        <DataTable
                            isLoading={isLoading}
                            columns={columns}
                            data={OrderData?.data?.data}
                            totalItem={OrderData?.data.total}
                            nextPagination={OrderData?.data.next_page_url}
                        />
                    )}
                    <Toaster />
                </div>
            )}
        </>
    );
}
