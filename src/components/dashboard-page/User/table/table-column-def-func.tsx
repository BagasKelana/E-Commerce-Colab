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
import { Circle, MoreHorizontal, ShieldCheck, User } from 'lucide-react';

import { Role, User as UserDataType } from '@/fetch';

import { Separator } from '@/components/ui/separator';

import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { deleteItem } from '@/lib/delete-item-func';
import { catchError } from '@/lib/catch-error';
import DataTableColumnHeader from '../../table-component/DataTableColumnHeader';
import { showImageAPI } from '@/helpers/showImageAPI';

export function fetchTasksTableColumnDefs(
    isPending: boolean,
    startTransition: React.TransitionStartFunction,
    reFetchData: () => void,
    token?: string
): ColumnDef<UserDataType, unknown>[] {
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
                const userImage = row.original.image;

                return (
                    <div className="flex gap-2 items-center">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={showImageAPI(userImage)}
                                alt="image-user"
                            />
                            <AvatarFallback className="bg-white"></AvatarFallback>
                        </Avatar>

                        <div className="max-w-[300px]">
                            {row.getValue('name')}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    querySorting="sf"
                    title="Email"
                />
            ),
            cell: ({ row }) => (
                <div className="text-blue-700"> {row.getValue('email')}</div>
            ),
            enableSorting: false
        },
        {
            accessorKey: 'is_active',
            header: () => <div>User Status</div>,
            cell: ({ row }) => {
                return row.getValue('is_active') === 1 ? (
                    <div className="text-teal-700 flex items-center gap-2">
                        <Circle className="w-3 h-3 bg-teal-700 rounded-full" />{' '}
                        Active
                    </div>
                ) : (
                    <div className="text-rose-700">Inactive</div>
                );
            }
        },
        {
            accessorKey: 'roles',
            header: () => <div>User Role</div>,
            cell: ({ row }) => {
                const userRole = row.getValue('roles') as Role[];

                return (
                    <div className="text-teal-700 ">
                        {userRole.map((role) =>
                            role.name === 'admin' ? (
                                <div
                                    key={role.id}
                                    className="text-teal-700 flex items-center gap-2"
                                >
                                    <ShieldCheck className="h-4 w-4" />{' '}
                                    {role.name.toUpperCase()}
                                </div>
                            ) : (
                                <div
                                    key={role.id}
                                    className="text-rose-700 flex items-center gap-2"
                                >
                                    <User className="h-4 w-4" />{' '}
                                    {role.name.toUpperCase()}
                                </div>
                            )
                        )}
                    </div>
                );
            },
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
                                disabled={row.original.id === 1 ? true : false}
                                onClick={() => {
                                    startTransition(() => {
                                        row.toggleSelected(false);

                                        toast.promise(
                                            deleteItem(
                                                row.original.id,
                                                'USER',
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
                                Delete User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];
}
