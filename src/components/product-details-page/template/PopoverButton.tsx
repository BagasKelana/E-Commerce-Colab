import { LucideProps } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Link, Facebook } from 'lucide-react';

type PopoverButtonProps = {
    textIcon: React.FC<LucideProps>;
    text: string;
    buttonClassName?: string;
    iconClassName?: string;
    textClassName?: string;
};

const PopoverButton: React.FC<PopoverButtonProps> = ({
    textIcon: Icon,
    text,
    buttonClassName,
    iconClassName,
    textClassName
}) => {
    return (
        <Popover>
            <PopoverTrigger className={buttonClassName}>
                <Icon className={iconClassName} />
                <span className={textClassName}>{text}</span>
            </PopoverTrigger>
            <PopoverContent className="w-auto flex flex-col justify-center items-start px-2">
                <Button variant={'link'} className="gap-2">
                    <Link className="w-4" />
                    <span className="text-sm">Link</span>
                </Button>
                <Separator />
                <Button variant={'link'} className="gap-2">
                    <Facebook className="w-4" />
                    <span className="text-sm">Facebook</span>
                </Button>
                <Separator />
            </PopoverContent>
        </Popover>
    );
};

export default PopoverButton;
