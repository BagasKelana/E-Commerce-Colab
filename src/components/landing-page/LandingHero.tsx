import Slider, { Settings } from 'react-slick';
import { useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landing-page.css';

import { cn } from '@/lib/utils';
import { NextArrow, PrevArrow } from '../Carousel/Arrow';

const img = [
    '/images/6561a9a2627d81eb4c09c0e8.jpg',
    '/images/6561a9a3627d81eb4c09c1a7.jpg',
    '/images/6561a9a3627d81eb4c09c1c9.jpg',
    '/images/6561a9a3627d81eb4c09c1ee.jpg',
    '/images/6561a9a3627d81eb4c09c1ee.jpg',
    '/images/6561a9a3627d81eb4c09c1ee.jpg',
    '/images/6561a9a3627d81eb4c09c1ee.jpg'
];

type DotSlide = {
    currentSlide: number;
    nextSlide: number;
};

const LandingHero = () => {
    const [dotSlide, setDotSlide] = useState<DotSlide>({
        currentSlide: 0,
        nextSlide: 1
    });

    const settings: Settings = {
        beforeChange: (currentSlide, nextSlide) => {
            setDotSlide((current) => ({ ...current, currentSlide, nextSlide }));
        },
        draggable: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: 'ease-in-out',
        useCSS: true,
        appendDots: (dots) => (
            <div
                style={{
                    bottom: '0px',
                    padding: '0px'
                }}
            >
                <ul className="dots-list flex justify-center p-4"> {dots} </ul>
            </div>
        ),
        customPaging: (index) => (
            <div
                className={cn(
                    'h-1 w-1 md:h-2 md:w-2 bg-gray-400/50 hover:bg-gray-300 rounded-full transition duration-200 ease-in-out ',
                    index === dotSlide.nextSlide && 'bg-white hover:bg-white'
                )}
            />
        ),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    draggable: true
                }
            }
        ]
    };
    return (
        <div className="w-full px-4 md:px-20 my-4 container ">
            <div className="group h-full relative w-full">
                <Slider {...settings}>
                    {img.map((img) => (
                        <img
                            key={img}
                            height={300}
                            width={1200}
                            className="object-cover h-[200px] md:h-[300px] w-full  "
                            src={img}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default LandingHero;
