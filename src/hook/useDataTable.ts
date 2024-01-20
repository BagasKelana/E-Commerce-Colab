import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type FetchErrorType = AxiosError | null;

const useDataTable = <T>(url: string, initialState: null, token: string) => {
    const [data, setData] = useState<T | null>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<FetchErrorType>(null);
    const [queryParameters] = useSearchParams();

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userToken = token
                    ? { Authorization: 'Bearer ' + token }
                    : '';

                const axiosConfig = {
                    signal,
                    headers: userToken || {}
                };

                console.log(url, axiosConfig);

                const res: AxiosResponse | null = await axios.get(
                    url,
                    axiosConfig
                );

                if (res?.data) {
                    setData(res.data);
                } else {
                    setData(null);
                }
            } catch (err: unknown) {
                if (signal.aborted) return;
                const error = err as AxiosError;
                setError(error);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [queryParameters, token, url]);

    const reFetchData = async () => {
        try {
            setIsLoading(true);
            const userToken = token ? { Authorization: token } : '';

            const axiosConfig = {
                headers: userToken || {}
            };

            const res: AxiosResponse | null = await axios.get(url, axiosConfig);
            if (res?.data) {
                setData(res.data);
            } else {
                setData(null);
            }
        } catch (err: unknown) {
            const error = err as AxiosError;
            setError(error);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, reFetchData };
};

export default useDataTable;
