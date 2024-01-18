import Slider, { Settings } from 'react-slick';
import { useState } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landing-page.css';

import { cn } from '@/lib/utils';
import { NextArrow, PrevArrow } from '../Carousel/Arrow';

const img = [
    '/images/429e3395-e54d-4ff2-8d54-47784086daa0.jpg.webp',
    '/images/09ca38b8-fa15-4e7c-a852-da2be08b5042.jpg.webp',
    '/images/id-50009109-96e46f7e61898a3baddbae5f7d65f1e5_xxhdpi.png',
    '/images/id-50009109-b36a2f24939caa00a796df79fd0e0c99_xxhdpi.png',
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
        <div className="w-full pt-4 px-4 md:px-6 lg:px-20 my-4 container">
            <div className="group h-full relative w-full">
                <Slider {...settings}>
                    {img.map((img) => (
                        <img
                            key={img}
                            className="object-cover object-center aspect-[12/5] md:aspect-[12/4]  xl:aspect-[12/3]  rounded overflow-hidden"
                            src={img}
                            alt="img-slider"
                        />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default LandingHero;
