import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';

export type FetchAllProduct = {
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: {
        current_page: number;
        data: ProductData[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: Link[];
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
};

type ProductData = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    price: number;
    is_available: number;
    featured: number;
    featured_image_id?: number;
    created_at?: string;
    updated_at: string;
    deleted_at: string | null;
    category_id: number;
    featured_image?: FeaturedImage;
    product_image: ProductImage[];
};

type FeaturedImage = {
    id: number;
    image: string;
};

type ProductImage = {
    id: number;
    image: string;
    created_at?: string;
    updated_at?: string;
    product_id: number;
};

export type Link = {
    url?: string;
    label: string;
    active: boolean;
};

export type FetchAllCategory = {
    data: {
        id: number;
        name: string;
        slug: string;
        created_at: string | null;
        updated_at: string | null;
        deleted_at: string | null;
    }[];
    meta: {
        code: number;
        status: string;
        message: string;
    };
};

const useFetch = <T>(url: string, initialState: null) => {
    const [data, setData] = useState<T | null>(initialState);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            if (url) {
                try {
                    setLoading(true);
                    const res: AxiosResponse | null = await axios.get(url, {
                        signal
                    });

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
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
