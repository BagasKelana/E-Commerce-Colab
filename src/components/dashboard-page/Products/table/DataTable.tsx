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
import DataLoader from '@/components/DataLoader';
import FilterProductTable from './FilterProductTable';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading: boolean;
    totalProduct?: number | null;
    nextPagination?: string | null;
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
                {headerGroup.headers.map((header) => (
                    <TableHead className="py-5" key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                    </TableHead>
                ))}
            </TableRow>
        ));
    };

    return (
        <>
            <div className="w-full">
                <div className="shadow-border shadow-slate-400/30 rounded-xl overflow-hidden">
                    <div className="border-none bg-white  pt-2 ">
                        <FilterProductTable isLoading={isLoading} />
                        <DataLoader spinner isLoading={isLoading}>
                            <Table>
                                <TableHeader>{renderTableHeader()}</TableHeader>

                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => {
                                            console.log(row.id);
                                            return (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={
                                                        row.getIsSelected() &&
                                                        'selected'
                                                    }
                                                >
                                                    {row
                                                        .getVisibleCells()
                                                        .map((cell) => {
                                                            return (
                                                                <TableCell
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        })}
                                                </TableRow>
                                            );
                                        })
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
                        </DataLoader>
                    </div>
                    <div className="flex items-center justify-end space-x-2 pt-2 pb-6 bg-white px-8 ">
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
