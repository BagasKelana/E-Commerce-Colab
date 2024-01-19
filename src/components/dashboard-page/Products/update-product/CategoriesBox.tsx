import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';

import { Button } from '../../../ui/button';
import { useContext, useState } from 'react';
import { formInputProps } from './UpdateProduct';
import { ProductCategoriesContext } from '@/ProductCategories';

interface InputFormProps {
    InputForm: {
        formInput: formInputProps;
        setFormInput: React.Dispatch<React.SetStateAction<formInputProps>>;
    };
}

const CategoriesBox: React.FC<InputFormProps> = ({ InputForm }) => {
    const { data: categoriesProduct } = useContext(ProductCategoriesContext);

    const { formInput, setFormInput } = InputForm;

    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'w-full justify-between',
                        formInput.category_id &&
                            'border-teal-700 text-teal-700 hover:text-teal-700/90',
                        open && 'border-teal-700'
                    )}
                >
                    {formInput.category_id
                        ? categoriesProduct?.data?.find(
                              (category) =>
                                  String(category.id) === formInput.category_id
                          )?.name
                        : 'Select Category'}
                    <ChevronsUpDown
                        className={cn(
                            'ml-2 h-4 w-4 shrink-0 text-slate-900',
                            formInput.category_id && 'text-teal-700'
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {categoriesProduct?.data?.map((category) => (
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
