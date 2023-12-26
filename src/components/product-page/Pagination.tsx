import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Link as LinkProps } from '@/hook/useFetch';

interface PaginationProps {
    links?: LinkProps[];
    url?: string;
}

const Pagination: React.FC<PaginationProps> = ({ url, links }) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete('page');

    const updatedQuerySearch = searchParams.toString();

    function getAllUrlParams(
        url?: string
    ): Record<string, string | string[] | boolean> {
        let queryString = url
            ? url.split('?')[1]
            : window.location.search.slice(1);

        const obj: Record<string, string | string[] | boolean> = {};

        if (queryString) {
            queryString = queryString.split('#')[0];

            const arr = queryString.split('&');

            for (let i = 0; i < arr.length; i++) {
                const a = arr[i].split('=');

                let paramName = a[0];
                let paramValue = typeof a[1] === 'undefined' ? true : a[1];

                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string')
                    paramValue = paramValue.toLowerCase();

                if (paramName.match(/\[(\d+)?\]$/)) {
                    const key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];

                    if (paramName.match(/\[\d+\]$/)) {
                        const index = /\[(\d+)\]/.exec(paramName);
                        if (index) {
                            const arrayIndex = parseInt(index[1]);
                            const keyArray = obj[key] as string[];
                            keyArray[arrayIndex] = paramValue as string;
                        }
                    } else {
                        (obj[key] as string[]).push(paramValue as string);
                    }
                } else {
                    if (!obj[paramName]) {
                        obj[paramName] = paramValue;
                    } else if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [
                            obj[paramName] as string,
                            paramValue as string
                        ];
                    } else {
                        (obj[paramName] as string[]).push(paramValue as string);
                    }
                }
            }
        }

        return obj;
    }
    const disabledLink = () => {
        const Page = links?.filter((link) => link.active);
        const currentPage = Page?.[0].label;

        console.log(currentPage);

        if (links && currentPage) {
            if (links.length === 3) {
                return links?.map((link, index) =>
                    index === links.length - 2 ? (
                        <Link
                            key={index}
                            className={buttonVariants({
                                variant: link.active ? 'ghost' : 'outline'
                            })}
                            to={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        >
                            {link.label === '&laquo; Previous'
                                ? '«'
                                : link.label === 'Next &raquo;'
                                ? '»'
                                : link.label}
                        </Link>
                    ) : (
                        <Link
                            key={index}
                            className={buttonVariants({
                                variant: 'disable'
                            })}
                            to={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        >
                            {link.label === '&laquo; Previous'
                                ? '«'
                                : link.label === 'Next &raquo;'
                                ? '»'
                                : link.label}
                        </Link>
                    )
                );
            }
            if (+currentPage === links?.length - 2) {
                return links?.map((link, index) =>
                    index === links.length - 1 ? (
                        <Link
                            key={index}
                            className={buttonVariants({
                                variant: 'disable'
                            })}
                            to={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        >
                            {link.label === '&laquo; Previous'
                                ? '«'
                                : link.label === 'Next &raquo;'
                                ? '»'
                                : link.label}
                        </Link>
                    ) : (
                        <Link
                            key={index}
                            className={buttonVariants({
                                variant: link.active ? 'ghost' : 'outline'
                            })}
                            to={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        >
                            {link.label === '&laquo; Previous'
                                ? '«'
                                : link.label === 'Next &raquo;'
                                ? '»'
                                : link.label}
                        </Link>
                    )
                );
            }

            if (+currentPage === 1) {
                return links?.map((link, index) =>
                    index === 0 ? (
                        <Link
                            key={index}
                            className={buttonVariants({
                                variant: 'disable'
                            })}
                            to={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        >
                            {link.label === '&laquo; Previous'
                                ? '«'
                                : link.label === 'Next &raquo;'
                                ? '»'
                                : link.label}
                        </Link>
                    ) : (
                        <Link
                            key={index}
                            className={buttonVariants({
                                variant: link.active ? 'ghost' : 'outline'
                            })}
                            to={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        >
                            {link.label === '&laquo; Previous'
                                ? '«'
                                : link.label === 'Next &raquo;'
                                ? '»'
                                : link.label}
                        </Link>
                    )
                );
            }

            return links?.map((link, index) => (
                <Link
                    key={index}
                    className={buttonVariants({
                        variant: link.active ? 'ghost' : 'outline'
                    })}
                    to={`${url}?${updatedQuerySearch}&page=${
                        link.url ? getAllUrlParams(link.url).page : ''
                    }`}
                >
                    {link.label === '&laquo; Previous'
                        ? '«'
                        : link.label === 'Next &raquo;'
                        ? '»'
                        : link.label}
                </Link>
            ));
        }
    };

    return <>{disabledLink()}</>;
};

export default Pagination;
