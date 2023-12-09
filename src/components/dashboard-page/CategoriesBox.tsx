import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';

import useFetch, { FetchAllCategory } from '@/hook/useFetch';

import { Button } from '../ui/button';
import { useState } from 'react';
import { formInputProps } from './CreateProduct';

interface InputFormProps {
    InputForm: {
        formInput: formInputProps;
        setFormInput: React.Dispatch<React.SetStateAction<formInputProps>>;
    };
}

const CategoriesBox: React.FC<InputFormProps> = ({ InputForm }) => {
    const { data } = useFetch<FetchAllCategory>(
        `${import.meta.env.VITE_DEVELOPE_API}/category`,
        null
    );

    const { formInput, setFormInput } = InputForm;

    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {formInput.category_id
                        ? data?.data?.find(
                              (category) =>
                                  String(category.id) === formInput.category_id
                          )?.name
                        : 'Select Category'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {data?.data?.map((category) => (
                            <CommandItem
                                key={category.slug}
                                value={String(category.id)}
                                onSelect={(currentValue) => {
                                    setFormInput((currentForm) => ({
                                        ...currentForm,
                                        category_id:
                                            currentValue ===
                                            currentForm.category_id
                                                ? ''
                                                : currentValue
                                    }));
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        formInput.category_id ===
                                            String(category.id)
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                {category.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default CategoriesBox;
