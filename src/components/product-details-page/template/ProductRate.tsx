import { cn } from '@/lib/utils';

type ProductRateProps = {
  value: number;
  color?: string;
  background?: string;
}

const ProductRate = ({ value, color, background }: ProductRateProps) => {
    return (
        <div
            className={cn(
                'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
                background
            )}
        >
            <div
                className={cn(
                  'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
                  color
              )}
                style={{
                    transform: `translateX(-${100 - (value || 0)}%)`
                }}
            ></div>
        </div>
    );
};

export default ProductRate;
