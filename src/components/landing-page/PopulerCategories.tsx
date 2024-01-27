import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../Carousel/CarouselSettings';

import { useContext } from 'react';

import { ProductCategoriesContext } from '@/ProductCategories';
import CategoryCard from '../Card/CategoryCard';
import { showImageAPI } from '@/helpers/showImageAPI';

import ErrorBoundary from '../ErrorBoundary';
import EmptyData from '../EmptyData';

const PopulerCategories = () => {
    const { data, loading, error } = useContext(ProductCategoriesContext);
    const categoriesData = data?.data;
    const isDataEmpty = categoriesData?.length;

    return (
        <ErrorBoundary errorMessages={error?.message}>
            <EmptyData isLoading={loading} isDataEmpty={!isDataEmpty}>
                <div className="w-full flex justify-between mb-4 px-2">
                    <h2 className="max-md:text-base">Popular Categories</h2>
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
                    {categoriesData ? (
                        <div className="group slice-categories h-full relative w-full">
                            <Slider {...settings}>
                                {categoriesData?.map((category, index) => (
                                    <CategoryCard
                                        key={index}
                                        src={showImageAPI(category.image)}
                                        title={category.name}
                                        categoryId={category.id}
                                    />
                                ))}
                            </Slider>
                        </div>
                    ) : null}
                </div>
            </EmptyData>
        </ErrorBoundary>
    );
};

export default PopulerCategories;
