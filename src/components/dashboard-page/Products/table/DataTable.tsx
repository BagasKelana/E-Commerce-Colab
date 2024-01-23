import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
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

import DataTablePagination from '../../table-component/DataTabelPagination';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading: boolean;
    totalProduct: number | null;
    nextPagination: string | null;
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    totalProduct,
    nextPagination
}: DataTableProps<TData, TValue>) {
    React.useState<ColumnFiltersState>([]);

    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection
        }
    });

    const renderTableHeader = () => {
        return table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                    return index === 1 ? (
                        <TableHead className="w-[5%]" key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                  )}
                        </TableHead>
                    ) : (
                        <TableHead className="py-6" key={header.id}>
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
            <div className="w-full">
                <div className="shadow-md shadow-slate-400/80 rounded-xl overflow-hidden">
                    <div className="border-none bg-white px-4 pt-2">
                        <Table>
                            <TableHeader>{renderTableHeader()}</TableHeader>

                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={
                                                row.getIsSelected() &&
                                                'selected'
                                            }
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
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
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4 bg-white px-8 pb-2">
                        <DataTablePagination
                            nextPagination={nextPagination}
                            table={table}
                            totalItem={totalProduct}
                            key={3492840238402834}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
