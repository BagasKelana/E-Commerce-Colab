import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

type TabelPaginationProps<TData> = {
    totalItem: number | null;
    table: Table<TData>;
    nextPagination: string | null;
};

function DataTablePagination<TData>({
    table,
    totalItem,
    nextPagination
}: TabelPaginationProps<TData>) {
    const [queryParameters, setQueryParams] = useSearchParams();
    const currentPage = queryParameters.get('page');

    const handlePreviousPage = () => {
        if (currentPage) {
            const nextPage = +currentPage - 1;
            queryParameters.set('page', String(nextPage));
            return setQueryParams(queryParameters);
        }
        queryParameters.set('page', '2');
    };

    const handleNextPage = () => {
        if (currentPage) {
            const nextPage = +currentPage + 1;
            queryParameters.set('page', String(nextPage));
            return setQueryParams(queryParameters);
        }
        queryParameters.set('page', '2');
        return setQueryParams(queryParameters);
    };
    return (
        <>
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of {totalItem}{' '}
                row(s) selected.
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={
                        currentPage ? (+currentPage === 1 ? true : false) : true
                    }
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={!nextPagination}
                >
                    Next
                </Button>
            </div>
        </>
    );
}

export default DataTablePagination;
