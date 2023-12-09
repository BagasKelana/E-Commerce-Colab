import { FilterListProps } from './product-type';

const FilterList: React.FC<FilterListProps> = ({
    onClick,
    id,
    children,
    className
}) => {
    return (
        <li
            onClick={onClick}
            id={id}
            className={`${className} cursor-pointer p-2 text-black`}
        >
            {children}
        </li>
    );
};

export default FilterList;
