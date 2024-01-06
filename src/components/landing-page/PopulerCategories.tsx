import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';

import CategoriesCard from '../Card/CategoriesCard';

import { populerCategories } from '@/assets/populerCategories';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../Carousel/CarouselSettings';

import { useEffect, useState } from 'react';
import { FetchAllCategory } from '@/hook/useFetch';
import axios, { AxiosError, AxiosResponse } from 'axios';

const PopulerCategories = () => {
    const [categoryData, setCategoryData] = useState<FetchAllCategory | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorCategory, setErrorCategory] = useState<AxiosError | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const url = `${
            import.meta.env.VITE_DEVELOPE_API
        }/category`;

        const fetchData = async (url: string) => {
            try {
                setIsLoading(true);
                const res: AxiosResponse | null = await axios.get(url, {
                    signal
                });

                if (res?.data) {
                    setCategoryData(res.data);
                } else {
                    setCategoryData(null);
                }
            } catch (err: unknown) {
                if (signal.aborted) return;
                const error = err as AxiosError;
                setErrorCategory(error);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(url);

    }, []);

    return (
        <section className="w-full pl-4 md:px-20 my-6">
            <div className="w-full flex justify-between mb-4">
                <div>
                    <h2 className="max-md:text-base">Popular Categories</h2>
                </div>
                <div className="self-center">
                    <Link
                        className="font-bold items-center md:gap-2 flex max-sm:text-xs max-md:mr-4  "
                        to="/"
                    >
                        Find More
                        <ChevronRight className="max-sm:h-4 max-sm:w-4 " />
                    </Link>
                </div>
            </div>
            <div className="w-full relative">
                <div className="group slice-categories h-full relative w-full">
                    <Slider {...settings}>
                        {categoryData?.data?.map((category, index) => (
                            <CategoriesCard
                                key={index}
                                src={`${import.meta.env.VITE_DEVELOPE_API_IMG}/${category.image}`}
                                title={category.name}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default PopulerCategories;
