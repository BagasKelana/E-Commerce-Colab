import { useEffect, useState } from 'react';

interface NavScrollHook {
	isSticky: boolean;
}

const useNavScroll = (): NavScrollHook => {
	const [isSticky, setIsSticky] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 123) {
				setIsSticky(true);
			} else if (window.scrollY < 122) {
				setIsSticky(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isSticky]);

	return { isSticky };
};

export default useNavScroll;
