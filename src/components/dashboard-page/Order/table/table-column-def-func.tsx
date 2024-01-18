import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { OrderAdminType } from '@/fetch';

import { Separator } from '@/components/ui/separator';

import { toast } from 'sonner';

import { Link } from 'react-router-dom';
import { deleteItem } from '@/lib/delete-item-func';
import { catchError } from '@/lib/catch-error';
import DataTableColumnHeader from '../../table-component/DataTableColumnHeader';

export function fetchTasksTableColumnDefs(
    isPending: boolean,
    startTransition: React.TransitionStartFunction,
    setReFetch: React.Dispatch<React.SetStateAction<boolean>>,
    token?: string
): ColumnDef<OrderAdminType, unknown>[] {
    console.log(isPending, startTransition);

    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'date',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="date"
                />
            ),
            cell: ({ row }) => {
                const parsedDate = row.getValue('date')
                    ? new Date(row.getValue('date'))
                    : '';
                const readableDate = parsedDate
                    ? parsedDate.toLocaleDateString()
                    : 'belum ada';
                return (
                    <div className="text-teal-700 flex items-center gap-2">
                        {readableDate}
                    </div>
                );
            }
        },
        {
            accessorKey: 'invoice',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Invoice"
                />
            ),
            cell: ({ row }) => (
                <div className="text-blue-700"> {row.getValue('invoice')}</div>
            ),
            enableSorting: false
        },
        {
            accessorKey: 'total',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="total"
                />
            ),
            cell: ({ row }) => (
                <div className="text-blue-700"> {row.getValue('total')}</div>
            )
        },

        {
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Name"
                />
            ),
            cell: ({ row }) => {
                return (
                    <div className="max-w-[300px]">{row.getValue('name')}</div>
                );
            }
        },
        {
            accessorKey: 'address',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Address"
                />
            ),
            cell: ({ row }) => (
                <div className="text-blue-700"> {row.getValue('address')}</div>
            ),
            enableSorting: false
        },

        {
            accessorKey: 'phone',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Phone Number"
                />
            ),
            cell: ({ row }) => (
                <div className="text-blue-700"> {row.getValue('phone')}</div>
            ),
            enableSorting: false
        },

        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                console.log(row.original);

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="p-0 h-fit " variant="ghost">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Detail User</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    to={`/dashboard-admin/users/update/${row.original.id}`}
                                >
                                    Update User
                                </Link>
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem
                                onClick={() => {
                                    startTransition(() => {
                                        row.toggleSelected(false);

                                        toast.promise(
                                            deleteItem(
                                                row.original.id,
                                                'ORDER',
                                                token
                                            ),
                                            {
                                                loading: 'Deleting...',
                                                success: () => {
                                                    setReFetch(true);
                                                    return 'Product deleted successfully.';
                                                },
                                                error: (err: unknown) =>
                                                    catchError(err)
                                            }
                                        );
                                    });
                                }}
                            >
                                Delete User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];
}
