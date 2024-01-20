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
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';

import { FeaturedImage, ProductAdmin } from '@/fetch';

import { Separator } from '@/components/ui/separator';
import { FetchAllCategory } from '@/hook/useFetch';
import { toast } from 'sonner';
import { catchError } from '@/lib/catch-error';
import { deleteItem } from '@/lib/delete-item-func';
import DataTableColumnHeader from '../../table-component/DataTableColumnHeader';
import { formatRupiah } from '@/helpers/formatRupiah';

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
            accessorKey: 'featured_image',
            header: '',
            cell: ({ row }) => {
                const featuredImage = row.getValue(
                    'featured_image'
                ) as FeaturedImage;
                return (
                    <div className=" flex items-center h-12 border rounded border-input aspect-square overflow-hidden">
                        <img
                            className="object-cover"
                            src={`${import.meta.env.VITE_DEVELOPE_API_IMG}/${
                                featuredImage.image
                            }`}
                            alt="Featured Image"
                            loading="lazy"
                        />
                    </div>
                );
            }
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
            cell: ({ row }) => (
                <div className="max-w-[300px]">{row.getValue('name')}</div>
            )
        },
        {
            accessorKey: 'price',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Price"
                />
            ),
            cell: ({ row }) => {
                const price = parseFloat(row.getValue('price'));

                return (
                    <div className="font-medium flex gap-1">
                        <span>Rp</span>
                        {formatRupiah(price)}
                    </div>
                );
            }
        },
        {
            accessorKey: 'category_id',
            header: () => <div>Category</div>,
            cell: ({ row }) => {
                return (
                    <div>
                        {categoryProduct?.data?.map((category) => {
                            return row.getValue('category_id') === category.id
                                ? category.name
                                : null;
                        })}
                    </div>
                );
            }
        },
        {
            accessorKey: 'is_available',
            header: ({ column }) => {
                return (
                    <Button
                        className="px-0 hover:bg-transparent py-0 h-fit"
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Avalible
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return row.getValue('is_available') ? (
                    <div className="text-teal-700 "> Available</div>
                ) : (
                    <div className="text-rose-700">Not Available</div>
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
                            <Button className="p-0 h-fit" variant="ghost">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
