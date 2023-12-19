import { LucideProps } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';

type OpenModalButtonProps = {
    textIcon: React.FC<LucideProps>;
    text: string;
    buttonClassName?: string;
    iconClassName?: string;
    textClassName?: string;
};

const OpenModalButton: React.FC<OpenModalButtonProps> = ({
    textIcon: Icon,
    text,
    buttonClassName,
    iconClassName,
    textClassName
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className={buttonClassName}>
                <Icon className={iconClassName} />
                <span className={textClassName}>{text}</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Add To Cart or Buy Now!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Add To Cart</AlertDialogCancel>
                    <AlertDialogAction>Buy Now</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OpenModalButton;
