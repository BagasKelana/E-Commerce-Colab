import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Link as LinkProps } from '@/hook/useFetch';

interface PaginationProps {
    links?: LinkProps[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
    console.log(links);
    return (
        <>
            <div>
                {links?.map((link, index) => (
                    <Link
                        key={index}
                        className={buttonVariants({ variant: 'outline' })}
                        to={''}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Pagination;
