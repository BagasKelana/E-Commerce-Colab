import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import FilterOrderTable from './FilterOrderTable';
import DataTablePagination from '../../table-component/DataTabelPagination';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading: boolean;
    totalItem: number | null;
    nextPagination: string | null;
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    totalItem,
    nextPagination
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            columnVisibility,
            rowSelection
        }
    });

    const renderTableHeader = () => {
        return table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                        <TableHead className="" key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                  )}
                        </TableHead>
                    );
                })}
            </TableRow>
        ));
    };

    return (
        <>
            <FilterOrderTable isLoading={isLoading} />
            <div className="w-full">
                <div className="rounded-md border border-x-0 px-8 bg-white">
                    <Table>
                        <TableHeader>{renderTableHeader()}</TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    Filter
                </div>
                <div className="flex items-center justify-end space-x-2 py-4 px-8 bg-white">
                    <DataTablePagination
                        nextPagination={nextPagination}
                        table={table}
                        totalItem={totalItem}
                        key={3492840238402834}
                    />
                </div>
            </div>
        </>
    );
}
