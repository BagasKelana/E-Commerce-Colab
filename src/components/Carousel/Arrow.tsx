import { ChevronRight, ChevronLeft } from 'lucide-react';

type CaroselArrowProps = {
    onClick?: React.MouseEventHandler<SVGSVGElement>;
};

export const NextArrow: React.FC<CaroselArrowProps> = (props) => {
    const { onClick } = props;

    return (
        <div className="hidden absolute p-2 right-5 group-hover:-right-5 opacity-0 group-hover:opacity-100 z-[20] top-1/2 -translate-y-1/2 transform rounded-full bg-white hover:bg-white/50 cursor-pointer ease-in-out duration-300 md:block">
            <ChevronRight className="w-6 h-6 text-gray-600" onClick={onClick} />
        </div>
    );
};
export const PrevArrow: React.FC<CaroselArrowProps> = (props) => {
    const { onClick } = props;
    return (
        <div className="hidden absolute p-2 left-5 group-hover:-left-5 opacity-0 group-hover:opacity-100 z-[20] top-1/2 -translate-y-1/2 transform rounded-full bg-white hover:bg-white/50 cursor-pointer ease-in-out duration-300 md:block ">
            <ChevronLeft className="w-6 h-6 text-gray-600 " onClick={onClick} />
        </div>
    );
};
