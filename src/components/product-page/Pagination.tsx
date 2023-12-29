import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Link as LinkProps } from '@/hook/useFetch';
import { useMemo } from 'react';

interface PaginationProps {
    linksPagination?: LinkProps[];
    url?: string;
}

const Pagination: React.FC<PaginationProps> = ({ url, linksPagination }) => {
    const searchParams = new URLSearchParams(location.search);

    const links = useMemo(() => linksPagination, [linksPagination]);

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

    const paginationFunctionComponent = () => {
        const filteredLinks = [];

        if (links?.length) {
            for (let i = 0; i < links.length; i++) {
                const link = links?.[i];
                if (link?.active) {
                    filteredLinks.push({ ...link, index: i });
                }
            }
        }

        const [currentPage] = filteredLinks;

        if (links?.length && currentPage?.index && links?.length > 3) {
            if (links.length - 2 === currentPage.index) {
                return links?.map((link, index) =>
                    index === links.length - 1 ? (
                        <LinkDisable
                            key={index}
                            link={link}
                            url={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        />
                    ) : (
                        <LinkActive
                            key={index}
                            link={link}
                            url={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        />
                    )
                );
            }

            if (currentPage.index === 1) {
                return links?.map((link, index) =>
                    index === 0 ? (
                        <LinkDisable
                            link={link}
                            url={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                            key={index}
                        />
                    ) : (
                        <LinkActive
                            key={index}
                            link={link}
                            url={`${url}?${updatedQuerySearch}&page=${
                                link.url ? getAllUrlParams(link.url).page : ''
                            }`}
                        />
                    )
                );
            }

            return links?.map((link, index) => (
                <LinkActive
                    key={index}
                    link={link}
                    url={`${url}?${updatedQuerySearch}&page=${
                        link.url ? getAllUrlParams(link.url).page : ''
                    }`}
                />
            ));
        }

        return null;
    };

    return <>{paginationFunctionComponent()}</>;
};

const LinkActive = ({ link, url }: { link: LinkProps; url: string }) => {
    const linkActive = useMemo(() => link, [link]);
    return (
        <Link
            className={buttonVariants({
                variant: linkActive.active
                    ? 'primery'
                    : linkActive.label !== '...' && isNaN(+linkActive.label)
                    ? 'outline'
                    : 'outline1',
                size: 'pagination'
            })}
            to={url}
        >
            {linkActive.label === '&laquo; Previous'
                ? '«'
                : linkActive.label === 'Next &raquo;'
                ? '»'
                : linkActive.label}
        </Link>
    );
};

const LinkDisable = ({ link, url }: { link: LinkProps; url: string }) => {
    const linkActive = useMemo(() => link, [link]);
    return (
        <Link
            className={buttonVariants({
                variant: 'disable',
                size: 'pagination'
            })}
            to={url}
        >
            {linkActive.label === '&laquo; Previous'
                ? '«'
                : linkActive.label === 'Next &raquo;'
                ? '»'
                : linkActive.label}
        </Link>
    );
};

export default Pagination;
