import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export type FetchErrorType = AxiosError | null;

const useFetchDataTable = <T>(
    fetchData: 'ORDER' | 'PRODUCT' | 'CATEGORY' | 'USER',
    initialState: null,
    token?: string
) => {
    const [data, setData] = useState<T | null>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<FetchErrorType>(null);
    const [queryParameters] = useSearchParams();

    const fetchTypeMap: Record<
        'ORDER' | 'PRODUCT' | 'CATEGORY' | 'USER',
        string
    > = {
        ORDER: 'order',
        PRODUCT: 'product',
        CATEGORY: 'category',
        USER: 'user'
    };

    const url = fetchTypeMap[fetchData];

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        const urlParams = new URLSearchParams(queryParameters);
        const searchQuery = urlParams.toString();

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userToken = token
                    ? { Authorization: 'Bearer ' + token }
                    : '';

                const axiosConfig = {
                    signal,
                    headers: {
                        ...userToken,
                        //untuk menghindari ngrok browser warning
                        'ngrok-skip-browser-warning': 'any_value'
                    }
                };

                if (!userToken) {
                    throw new Error('Unauthorized. User Token Required');
                }

                const res: AxiosResponse | null = await axios.get(
                    `/admin/${url}?${searchQuery}`,
                    axiosConfig
                );

                if (res?.data) {
                    setData(res.data);
                } else {
                    setData(null);
                    throw new Error('An Unexpected Error Occurred');
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
        const urlParams = new URLSearchParams(queryParameters);
        const searchQuery = urlParams.toString();
        try {
            setIsLoading(true);
            const userToken = token ? { Authorization: 'Bearer ' + token } : '';

            if (!userToken) {
                throw new Error('Unauthorized. User Token Required');
            }
            const axiosConfig = {
                headers: {
                    ...userToken,
                    //untuk menghindari ngrok browser warning
                    'ngrok-skip-browser-warning': 'any_value'
                }
            };

            console.log(url, axiosConfig);

            const res: AxiosResponse | null = await axios.get(
                `${url}?${searchQuery}`,
                axiosConfig
            );

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

export default useFetchDataTable;
