import { FilterListProps } from './product-type';

const FilterList: React.FC<FilterListProps> = ({
    onClick,
    id,
    children,
    className,
    isLoading
}) => {
    return (
        <li
            onClick={onClick}
            id={id}
            className={`${className || 'text-gray-600'} ${
                isLoading && 'pointer-events-none'
            } cursor-pointer p-2 select-none hover:bg-gray-100 rounded `}
        >
            {children}
        </li>
    );
};

export default FilterList;
