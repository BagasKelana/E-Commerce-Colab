import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const orders = [
    {
        value: 'relevance',
        label: 'Relevance'
    },
    {
        value: 'name',
        label: 'Nama'
    },
    {
        value: 'price',
        label: 'Harga Termurah'
    },
    {
        value: 'price_desc',
        label: 'Harga Termahal'
    }
];

const OrderBox = () => {
    const [open, setOpen] = useState(false);
    const [queryParameters, setQueryParameters] = useSearchParams();
    const [value, setValue] = useState(
        queryParameters.get('sf') === 'price' &&
            queryParameters.get('so') === 'desc'
            ? 'price_desc'
            : queryParameters.get('sf') || 'relevance'
    );

    const handleOnSelect: ((value: string) => void) | undefined = (
        currentValue
    ) => {
        setOpen(false);
        if (currentValue && currentValue !== 'relevance') {
            if (currentValue === 'price_desc') {
                queryParameters.set('sf', 'price');
                queryParameters.set('so', 'desc');
            } else {
                queryParameters.set('sf', currentValue);
                queryParameters.delete('so');
            }

            queryParameters.delete('page');
            setQueryParameters(queryParameters);

            return setValue(currentValue);
        } else {
            queryParameters.delete('sf');
            queryParameters.delete('so');
            queryParameters.delete('page');
            setQueryParameters(queryParameters);

            return setValue('relevance');
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    aria-label="combobox-order"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between hover:border-teal-700 hover:bg-transparent"
                >
                    {value
                        ? orders.find((order) => order.value === value)?.label
                        : 'Relevance'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {orders.map((order) => (
                            <CommandItem
                                key={order.value}
                                value={order.value || 'relevance'}
                                onSelect={handleOnSelect}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === order.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                {order.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default OrderBox;
