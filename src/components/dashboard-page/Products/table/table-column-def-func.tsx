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
import { MoreHorizontal, MoreVertical } from 'lucide-react';

import { ProductAdmin } from '@/fetch';

import { Separator } from '@/components/ui/separator';
import { FetchAllCategory } from '@/hook/useFetch';
import { toast } from 'sonner';
import { catchError } from '@/lib/catch-error';
import { deleteItem } from '@/lib/delete-item-func';
import DataTableColumnHeader from '../../table-component/DataTableColumnHeader';
import { formatRupiah } from '@/helpers/formatRupiah';
import { showImageAPI } from '@/helpers/showImageAPI';
import { Badge } from '@/components/ui/badge';

export function fetchTasksTableColumnDefs(
    isPending: boolean,
    startTransition: React.TransitionStartFunction,
    categoryProduct: FetchAllCategory | null,
    reFetchData: () => Promise<void>,
    token?: string
): ColumnDef<ProductAdmin, unknown>[] {
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
                    title="NAME"
                />
            ),
            cell: ({ row }) => {
                const userImage = row.original.featured_image.image;
                return (
                    <div className="flex gap-4 w-full items-center">
                        <div className="h-full w-14 rounded border border-slate-300">
                            <img
                                className="object-cover"
                                src={showImageAPI(userImage)}
                                alt="image of product"
                            />
                        </div>
                        <span className="whitespace-nowrap font-medium">
                            {row.getValue('name')}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: 'price',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="PRICE"
                />
            ),
            cell: ({ row }) => {
                const price = parseFloat(row.getValue('price'));

                return (
                    <div className=" flex gap-1">
                        <span>Rp</span>
                        {formatRupiah(price)}
                    </div>
                );
            }
        },
        {
            accessorKey: 'category_id',
            header: () => <div>CATEGORY</div>,
            cell: ({ row }) => {
                return (
                    <div>
                        {categoryProduct?.data?.map((category) => {
                            return row.getValue('category_id') ===
                                category.id ? (
                                <Badge variant={'outline'}>
                                    {category.name}
                                </Badge>
                            ) : null;
                        })}
                    </div>
                );
            }
        },
        {
            accessorKey: 'is_available',
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        querySorting="sf"
                        title="STATUS"
                    />
                );
            },
            cell: ({ row }) => {
                return row.getValue('is_available') ? (
                    <Badge className="text-teal-600 bg-slate-100 hover:bg-slate-100 hover:text-teal-600">
                        Available
                    </Badge>
                ) : (
                    <Badge variant={'destructive'}>Not Available</Badge>
                );
            },
            enableSorting: false
        },
        {
            id: 'actions',
            enableHiding: false,
            header: '',
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                role="actions"
                                className="rounded-full h-fit p-2"
                                variant="ghost"
                            >
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Detail Product</DropdownMenuItem>
                            <DropdownMenuItem>Update Product</DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem
                                onClick={() => {
                                    startTransition(() => {
                                        row.toggleSelected(false);

                                        toast.promise(
                                            deleteItem(
                                                row.original.id,
                                                'PRODUCT',
                                                token
                                            ),
                                            {
                                                loading: 'Deleting...',
                                                success: () => {
                                                    reFetchData();
                                                    return 'Product deleted successfully.';
                                                },
                                                error: (err: unknown) =>
                                                    catchError(err)
                                            }
                                        );
                                    });
                                }}
                            >
                                Delete Product
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];
}
