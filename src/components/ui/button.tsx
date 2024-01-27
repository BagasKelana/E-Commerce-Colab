import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-slate-500 bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                primery: 'text-white bg-teal-700 hover:bg-teal-700/90',
                disable: 'pointer-events-none',
                outline1:
                    'bg-background hover:bg-accent hover:text-accent-foreground ',
                outlinePrimery:
                    'text-teal-700 bg-transparant border border-teal-700'
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
                pagination:
                    'text-xs sm:text-sm md:text-base h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-md'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, children, variant, size, isLoading = false, ...props },
        ref
    ) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading}
                {...props}
            >
                {children}
                {isLoading ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : null}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
