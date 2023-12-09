import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();
    const [queryParams] = useSearchParams();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [pathname, queryParams]);

    return null;
};

export default ScrollToTop;
