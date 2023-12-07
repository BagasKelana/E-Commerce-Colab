import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
	// Extracts pathname property(key) from an object
	const { pathname } = useLocation();
	const [queryParams] = useSearchParams();

	// Automatically scrolls to top whenever pathname changes
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, [pathname, queryParams]);

	return null;
};

export default ScrollToTop;
