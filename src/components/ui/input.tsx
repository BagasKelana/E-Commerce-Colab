import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md ring-1 ring-slate-400 hover:ring-slate-500  bg-background px-3 py-2 text-sm ring-offset-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-teal-600 focus-visible:ring-[1.5px]  disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-in-out duration-200',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
