import { fetchTasksTableColumnDefs } from './table/table-column-def-func';
import DataTable from './table/DataTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import { FetchAllUserAdmin, User } from '@/fetch';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Filter } from '@/components/product-page/product-type';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ColumnDef } from '@tanstack/react-table';
import { Toaster } from 'sonner';

export default function UserManagement() {
    const { currentUser } = useSelector((state: RootState) => state.user);
    const [productData, setProductData] = useState<FetchAllUserAdmin | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorProduct, setErrorProduct] = useState<AxiosError | null>(null);
    const [queryParameters] = useSearchParams();
    const [filter, setFilter] = useState<Filter>({});
    const [reFetch, setReFetch] = useState(false);

    console.log(errorProduct, filter);

    useEffect(() => {
        const urlParams = new URLSearchParams(queryParameters);

        const initialFilterState = {
            term: queryParameters.get('q'),
            category_id: queryParameters.get('category_id'),
            min: queryParameters.get('min'),
            max: queryParameters.get('max'),
            sf: queryParameters.get('sf'),
            so: queryParameters.get('so'),
            page: queryParameters.get('page')
        };

        setFilter((current) => ({
            ...current,
            ...initialFilterState
        }));

        const searchQuery = urlParams.toString();
        const controller = new AbortController();
        const { signal } = controller;

        const url = `https://roughy-loyal-daily.ngrok-free.app/api/admin/user?${searchQuery}`;

        const fetchData = async (url: string) => {
            try {
                setIsLoading(true);
                const res: AxiosResponse | null = await axios.get(url, {
                    signal,
                    headers: { Authorization: 'Bearer ' + currentUser?.token }
                });

                if (res?.data) {
                    setProductData(res.data);
                } else {
                    setProductData(null);
                }
            } catch (err: unknown) {
                if (signal.aborted) return;
                const error = err as AxiosError;
                setErrorProduct(error);
                console.error(err);
            } finally {
                setIsLoading(false);
                setReFetch(false);
            }
        };

        fetchData(url);

        return () => controller.abort();
    }, [queryParameters, currentUser?.token, reFetch]);

    const [isPending, startTransition] = useTransition();

    // Memoize the columns so they don't re-render on every render
    const columns = useMemo<ColumnDef<User, unknown>[]>(
        () =>
            fetchTasksTableColumnDefs(
                isPending,
                startTransition,
                setReFetch,
                currentUser?.token
            ),
        [isPending, currentUser?.token]
    );
    console.log();

    return (
        <div className="w-full ">
            {productData?.data?.data && (
                <DataTable
                    isLoading={isLoading}
                    columns={columns}
                    data={productData?.data?.data}
                    totalItem={productData?.data.total}
                    nextPagination={productData?.data.next_page_url}
                />
            )}
            <Toaster />
        </div>
    );
}
