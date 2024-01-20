import { type Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
    querySorting?: string;
}

export default function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
    querySorting
}: DataTableColumnHeaderProps<TData, TValue>) {
    const [queryParameters, setQueryParams] = useSearchParams();

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    const handleSortAscending = () => {
        if (querySorting) {
            queryParameters.delete('so');
            queryParameters.delete(querySorting);
            queryParameters.set(querySorting, title.toLowerCase());
            setQueryParams(queryParameters);
        }
    };

    const handleSortDescending = () => {
        if (querySorting) {
            queryParameters.delete(querySorting);
            queryParameters.delete('so');
            queryParameters.set(querySorting, title.toLowerCase());
            queryParameters.set('so', 'desc');
            setQueryParams(queryParameters);
        }
    };

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none focus-visible:border-0 "
                    asChild
                >
                    <Button
                        className="px-0 hover:bg-transparent py-0 h-fit"
                        variant="ghost"
                        aria-label="Sorting button. Click to sort ascending or descending."
                    >
                        <span>{title}</span>

                        <ChevronsUpDown
                            className="ml-2 h-4 w-4"
                            aria-hidden="true"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        aria-label="Sort ascending"
                        onClick={handleSortAscending}
                    >
                        <ArrowUpIcon
                            className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                            aria-hidden="true"
                        />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        aria-label="Sort descending"
                        onClick={handleSortDescending}
                    >
                        <ArrowDownIcon
                            className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                            aria-hidden="true"
                        />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
