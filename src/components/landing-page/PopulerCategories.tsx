import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Slider, { Settings } from 'react-slick';

import CategoriesCard from '../Card/CategoriesCard';
import { NextArrow, PrevArrow } from '../Carusel/Arrow';
import { populerCategories } from '@/assets/populerCategories';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PopulerCategories = () => {
	const settings: Settings = {
		draggable: false,
		dots: false,
		infinite: false,
		slidesToShow: 6,
		slidesToScroll: 6,
		initialSlide: 0,
		waitForAnimate: true,
		cssEase: 'ease-in-out',
		lazyLoad: 'anticipated',
		useCSS: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					initialSlide: 0,
					dots: false,
					draggable: true,
					speed: 500,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 0,
					dots: false,
					draggable: true,
					speed: 500,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 0,
					dots: false,
					draggable: true,
					speed: 500,
					swipe: true,
					cssEase: 'ease-in-out',
					touchThreshold: 10,
				},
			},
		],
	};
	return (
		<section className="w-full pl-4 md:px-20 my-6">
			<div className="w-full flex justify-between mb-4">
				<div>
					<h2 className="max-md:text-base">Popular Categories</h2>
				</div>
				<div className="self-center">
					<Link
						className="font-bold items-center md:gap-2 flex max-sm:text-xs max-md:mr-4  "
						to="/">
						Find More
						<ChevronRight className="max-sm:h-4 max-sm:w-4 " />
					</Link>
				</div>
			</div>
			<div className="w-full relative">
				<div className="group h-full relative w-full">
					<Slider {...settings}>
						{populerCategories.map((category, index) => (
							<CategoriesCard
								key={index}
								className={cn(
									'sm:translate-x-[0%] ',
									`translate-x-[10%]`
								)}
								src={category.src}
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
