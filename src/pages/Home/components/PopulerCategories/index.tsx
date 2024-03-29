import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import CategoryCard from '@/components/Card/CategoryCard';
import { settings } from '@/components/Carousel/CarouselSettings';
import EmptyData from '@/components/EmptyData';
import ErrorBoundary from '@/components/ErrorBoundary';
import { showImageAPI } from '@/helpers/showImageAPI';
import { useCategory } from '@/modules/category/hooks/useCategory';

const PopulerCategories = () => {
  const { data, isLoading, error } = useCategory();

  const categoriesData = data?.data;
  const isDataEmpty = categoriesData?.length;

  return (
    <div className="w-full px-4 md:px-6 xl:px-16 bg-slate-50 py-4 text-slate-950 border-y border-input">
      <ErrorBoundary errorMessages={error?.message}>
        <EmptyData isLoading={isLoading} isDataEmpty={!isDataEmpty}>
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
    </div>
  );
};

export default PopulerCategories;
