import Slider, { Settings } from 'react-slick';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const img = [
    '/images/6561a9a2627d81eb4c09c0e8.jpg',
    '/images/6561a9a3627d81eb4c09c1a7.jpg',
    '/images/6561a9a3627d81eb4c09c1c9.jpg',
    '/images/6561a9a3627d81eb4c09c1ee.jpg',
    '/images/6561a9a3627d81eb4c09c1a7.jpg'
];

type productImagesProps = {
    currentSlide: number;
    nextSlide: number;
};

const ProductImages = () => {
    const [imageSlide, setImageSlide] = useState<productImagesProps>({
        currentSlide: 0,
        nextSlide: 1
    });

    const settings: Settings = {
        useCSS: true,
        speed: 800,
        dots: true,
        arrows: false,
        lazyLoad: "progressive",
        dotsClass: 'flex justify-center items-center',
        easing: 'ease-out',

        beforeChange: (currentSlide, nextSlide) => {
            setImageSlide((current) => ({
                ...current,
                currentSlide,
                nextSlide
            }));
        },

        appendDots: (dots) => (
            <div>
                <ul className="flex gap-[1.4em] pt-[.5em]">{dots}</ul>
            </div>
        ),

        customPaging: (index) => (
            <img
                src={img[index % img.length]}
                alt={`Image ${index + 1}`}
                className={cn(
                    'object-cover aspect-square rounded-md shadow-md shadow-slate-800 hover:scale-105 hover:shadow-xl hover:shadow-slate-800 transition-transform duration-300 ease-in-out cursor-pointer block',
                    index === imageSlide.nextSlide &&
                        'scale-105 shadow-lg shadow-slate-800 border-[2px] border-purple-700'
                )}
            />
        )
    };

    return (
        <div className="w-full md:w-[37vw]">
            <Slider {...settings}>
                {img.map((img) => (
                    <img
                        src={img}
                        className="block object-cover aspect-[4/3] cursor-zoom-in hover:scale-150"
                    />
                ))}
            </Slider>
        </div>
    );
};

export default ProductImages;
