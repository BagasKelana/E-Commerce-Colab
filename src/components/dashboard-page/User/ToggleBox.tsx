import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { formSchema } from './UpdateUser';
import * as z from 'zod';
interface InputFormProps {
    setForm: UseFormSetValue<z.infer<typeof formSchema>>;

    title: string;
}

const ToggleBox: React.FC<InputFormProps> = ({ setForm, title }) => {
    const [isTrue, setIsTrue] = useState('1');

    const handleOnValueChange: ((value: string) => void) | undefined = (
        value
    ) => {
        setForm('is_active', value);
        setIsTrue(value);

        console.log(value);
    };

    console.log(+isTrue);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="select-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none flex justify-between"
                asChild
            >
                <Button
                    variant="outline"
                    className={cn(
                        'w-full',
                        +isTrue
                            ? 'text-teal-700 border-teal-700'
                            : 'text-rose-700 border-rose-700'
                    )}
                >
                    {title}
                    {+isTrue ? (
                        <Check className="ml-2 h-4 w-4 text-teal-700" />
                    ) : (
                        <X className="ml-2 h-4 w-4 text-rose-700" />
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[200px]" align="center">
                <DropdownMenuRadioGroup
                    value={isTrue}
                    onValueChange={handleOnValueChange}
                >
                    <DropdownMenuRadioItem value={'1'}>
                        {'True'}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={'0'}>
                        {'False'}
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ToggleBox;
