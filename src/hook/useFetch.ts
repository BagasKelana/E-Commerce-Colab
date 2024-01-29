import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

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

export type FetchAllProductfeatured = {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: ProductData[];
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
    image: string;
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

export type FetchErrorType = AxiosError | null;

const useFetch = <T>(url: string, initialState: null, token?: string) => {
  const [data, setData] = useState<T | null>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        const userToken = token ? { Authorization: 'Bearer ' + token } : '';

        const axiosConfig = {
          signal,
          headers: {
            ...userToken,
            //untuk menghindari ngrok browser warning
            'ngrok-skip-browser-warning': 'any_value'
          }
        };

        console.log(url, axiosConfig);

        const res: AxiosResponse | null = await axios.get(url, axiosConfig);

        if (res?.data) {
          setData(res.data);
        } else {
          setData(null);
          throw new Error(
            'An Unexpected Error Occurred. Please refresh the page to try again.'
          );
        }
      } catch (err: unknown) {
        if (signal.aborted) return;
        const error = err as AxiosError;
        setError(error);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, token]);

  const reFetchData = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  return { data, loading, error, reFetchData };
};

export default useFetch;
