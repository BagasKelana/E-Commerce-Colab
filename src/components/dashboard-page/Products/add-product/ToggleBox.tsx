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
import { formInputProps } from './AddProduct';
import { useMemo } from 'react';
interface InputFormProps {
    InputForm: {
        formInput: formInputProps;
        setFormInput: React.Dispatch<React.SetStateAction<formInputProps>>;
    };
    toggleInput: 'isAvailable' | 'featured';
    title: string;
}

const ToggleBox: React.FC<InputFormProps> = ({
    InputForm,
    toggleInput,
    title
}) => {
    const inputForm = useMemo(() => InputForm, [InputForm]);
    const { formInput, setFormInput } = inputForm;
    console.log(formInput);

    const handleOnValueChange: ((value: string) => void) | undefined = (
        value
    ) => {
        setFormInput((current) => ({
            ...current,
            [toggleInput]: +value
        }));
    };

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
                        +formInput[toggleInput]
                            ? 'text-teal-700 border-teal-700'
                            : 'text-rose-700 border-rose-700'
                    )}
                >
                    {title}
                    {+formInput[toggleInput] ? (
                        <Check className="ml-2 h-4 w-4 text-teal-700" />
                    ) : (
                        <X className="ml-2 h-4 w-4 text-rose-700" />
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[200px]" align="center">
                <DropdownMenuRadioGroup
                    value={String(formInput[toggleInput])}
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
