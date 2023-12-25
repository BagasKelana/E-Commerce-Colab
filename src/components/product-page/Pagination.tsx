import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import { Link as LinkProps } from '@/hook/useFetch';

interface PaginationProps {
    links?: LinkProps[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnClick = (
        page: string,
        firstPage: string,
        lastPage: string
    ) => {
        const currentPage = searchParams.get('page') || 1;
        console.log(firstPage, lastPage, currentPage);
        if (page && !isNaN(+page) && +page > 0) {
            searchParams.set('page', page);
            setSearchParams(searchParams);
            return;
        }
        if (page) {
            if (
                page === '&laquo; Previous' &&
                currentPage &&
                currentPage > firstPage
            ) {
                searchParams.set('page', String(+currentPage - 1));
                setSearchParams(searchParams);
                return;
            }
            if (
                page === 'Next &raquo;' &&
                currentPage &&
                currentPage < lastPage
            ) {
                searchParams.set('page', String(+currentPage + 1));
                setSearchParams(searchParams);
                return;
            }
        }
    };

    return (
        <>
            {links?.map((link, index) => {
                return (
                    <Button
                        onClick={() => {
                            handleOnClick(
                                link.label,
                                links[1].label,
                                links[links.length - 2].label
                            );
                        }}
                        key={index * 10000}
                        variant={link.active ? 'primery' : 'default'}
                    >
                        {link.label === '&laquo; Previous'
                            ? '«'
                            : link.label === 'Next &raquo;'
                            ? '»'
                            : link.label}
                    </Button>
                );
            })}
        </>
    );
};

export default Pagination;
