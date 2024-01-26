import { fetchTasksTableColumnDefs } from './table/table-column-def-func';
import DataTable from './table/DataTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { FetchAllUserAdmin, User } from '@/fetch';

import { useMemo, useTransition } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Toaster } from 'sonner';
import useFetchDataTable from '@/hook/useFetchDataTable';

export default function UserManagement() {
    const { currentUser } = useSelector((state: RootState) => state.user);

    const { data, isLoading, error, reFetchData } =
        useFetchDataTable<FetchAllUserAdmin>('USER', null, currentUser?.token);

    console.log(error);

    const user = data?.data ?? null;

    const [isPending, startTransition] = useTransition();

    // Memoize the columns so they don't re-render on every render
    const columns = useMemo<ColumnDef<User, unknown>[]>(
        () =>
            fetchTasksTableColumnDefs(
                isPending,
                startTransition,
                reFetchData,
                currentUser?.token
            ),
        [isPending, currentUser?.token, reFetchData]
    );
    console.log();

    return (
        <div className="w-full ">
            {user?.data && (
                <DataTable
                    isLoading={isLoading}
                    columns={columns}
                    data={user?.data}
                    totalItem={user?.total}
                    nextPagination={user?.next_page_url}
                />
            )}
            <Toaster />
        </div>
    );
}
