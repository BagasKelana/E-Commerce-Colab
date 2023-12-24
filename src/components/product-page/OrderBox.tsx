import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
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
        value: 'price_asc',
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
    const [value, setValue] = useState('relevance');
    const [isDesending, setIsDesending] = useState('');

    useEffect(() => {
        setValue(queryParameters.get('sf') || 'relevance');
        setIsDesending(queryParameters.get('so') || '');
    }, [queryParameters]);

    const handleOnSelect: ((value: string) => void) | undefined = (
        currentValue
    ) => {
        setOpen(false);
        if (currentValue === value && currentValue !== 'relevance') {
            queryParameters.delete('sf');
            setQueryParameters(queryParameters);
            return setValue('relevance');
        } else if (currentValue && currentValue !== 'relevance') {
            queryParameters.set('sf', currentValue);
            setQueryParameters(queryParameters);
            
            return setValue(currentValue);
        } else {
            if (queryParameters.get('sf')) {
                queryParameters.delete('sf');
                setQueryParameters(queryParameters);
            }
            return setValue('relevance');
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
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
