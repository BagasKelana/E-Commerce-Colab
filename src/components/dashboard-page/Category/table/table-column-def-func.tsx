import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { CategoryAdmin } from '@/fetch';
import DataTableColumnHeader from '../../table-component/DataTableColumnHeader';
import { Separator } from '@/components/ui/separator';

import { toast } from 'sonner';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { deleteItem } from '@/lib/delete-item-func';
import { catchError } from '@/lib/catch-error';
import { showImageAPI } from '@/helpers/showImageAPI';

export function fetchTasksTableColumnDefs(
    isPending: boolean,
    startTransition: React.TransitionStartFunction,
    setReFetch: React.Dispatch<React.SetStateAction<boolean>>,
    token?: string
): ColumnDef<CategoryAdmin, unknown>[] {
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
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Name"
                />
            ),
            cell: ({ row }) => {
                const categoryImage = row.original.image;

                return (
                    <div className="flex gap-2 items-center">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={showImageAPI(categoryImage)}
                                alt="caterogy image"
                            />
                        </Avatar>

                        <div className="max-w-[300px]">
                            {row.getValue('name')}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'item_count',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Item Count"
                />
            ),
            cell: ({ row }) => (
                <div className="text-blue-700">
                    {' '}
                    {row.getValue('item_count')}
                </div>
            ),
            enableSorting: false
        },
        {
            accessorKey: 'created_at',
            header: () => <div>Create At</div>,
            cell: ({ row }) => {
                const parsedDate = row.getValue('created_at')
                    ? new Date(row.getValue('created_at'))
                    : '';

                const readableDate = parsedDate ? (
                    parsedDate.toLocaleDateString()
                ) : (
                    <span className="text-destructive">belum ada</span>
                );
                return (
                    <div className="text-teal-700 flex items-center gap-2">
                        {readableDate}
                    </div>
                );
            }
        },
        {
            accessorKey: 'updated_at',
            header: () => <div>Update At</div>,
            cell: ({ row }) => {
                const parsedDate = row.getValue('updated_at')
                    ? new Date(row.getValue('updated_at'))
                    : '';

                const readableDate = parsedDate ? (
                    parsedDate.toLocaleDateString()
                ) : (
                    <span className="text-destructive">belum ada</span>
                );
                return (
                    <div className="text-teal-700 flex items-center gap-2">
                        {readableDate}
                    </div>
                );
            }
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="p-0 h-fit " variant="ghost">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Detail Category</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={''}>Update Category</Link>
                            </DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem
                                onClick={() => {
                                    row.toggleSelected(false);

                                    toast.promise(
                                        deleteItem(
                                            row.original.id,
                                            'CATEGORY',
                                            token
                                        ),
                                        {
                                            loading: 'Deleting...',
                                            success: () => {
                                                setReFetch(true);
                                                return 'Category deleted successfully.';
                                            },
                                            error: (err: unknown) =>
                                                catchError(err)
                                        }
                                    );
                                }}
                            >
                                Delete Category
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];
}
