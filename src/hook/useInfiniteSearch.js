import axios from 'axios';
import { useState, useEffect } from 'react';

const useInfiniteSearch = (url = null, page, query) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [hasNextData, setHasNextGame] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;
		const fetchData = async () => {
			try {
				if (page) {
					console.log(`${url}${query}&skip=${page}`);
					const res = await axios.get(`${url}${query}&skip=${page}`, {
						signal,
					});
					setHasNextGame(Boolean(res?.data?.games.length));

					if (res?.data?.games) {
						setData((current) => [...current, ...res.data.games]);
					} else {
						setData([]);
					}
				} else {
					console.log(`${url}${query}`);
					const res = await axios.get(`${url}${query}`, {
						signal,
					});
					setHasNextGame(Boolean(res?.data?.games.length));

					if (res?.data.games) {
						setData(res.data.games);
					} else {
						setData([]);
					}
				}
			} catch (err) {
				if (signal.aborted) return;
				setError(err);
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => controller.abort();
	}, [url, page, query]);

	return { data, loading, error, hasNextData };
};

export default useInfiniteSearch;
