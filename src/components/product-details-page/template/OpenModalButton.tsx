import { LucideProps } from 'lucide-react';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
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
    modalTitle?: string;
    modalDescription?: React.ReactNode;
    modalButton?: React.ReactNode;
};

const OpenModalButton: React.FC<OpenModalButtonProps> = ({
    textIcon: Icon,
    text,
    buttonClassName,
    iconClassName,
    textClassName,
    // modalTitle = "Hello World",
    modalDescription,
    modalButton
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className={buttonClassName}>
                <Icon className={iconClassName} />
                <span className={textClassName}>{text}</span>
            </AlertDialogTrigger>
            <AlertDialogContent className="z-[99999] p-6">
                <AlertDialogCancel className="absolute top-0 right-0 mr-2 mt-2 group px-[.5em] py-[.5em]">
                    <X className="w-5 h-5 group-hover:stroke-red-500" />
                </AlertDialogCancel>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-2">
                        <div className="w-28 h-28 bg-gray-700 rounded-lg"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <p className="bg-slate-400 text-xs font-thin w-12 justify-center flex rounded-md">
                                    color
                                </p>
                                <p className="bg-slate-400 text-xs font-thin w-12 justify-center flex rounded-md">
                                    specs
                                </p>
                            </div>
                            <div>
                                <h1 className="text-sm font-semibold w-72 mb-2">
                                    Laptop Dell Latitude 7280 I5 GEN 6 RAM 8GB
                                    SSD 256GB Backlight - 128 gb, 8GB
                                </h1>
                                <p className='text-xs font-normal'>Rp2.502.000</p>
                            </div>
                        </div>
                    </AlertDialogTitle>
                    <Separator />
                    {modalDescription}
                </AlertDialogHeader>
                <Separator />
                {modalButton}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OpenModalButton;
