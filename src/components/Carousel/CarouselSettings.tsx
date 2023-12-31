import { Settings } from 'react-slick';
import { NextArrow, PrevArrow } from './Arrow';

export const settings: Settings = {
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
                speed: 500
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 0,
                dots: false,
                draggable: true,
                speed: 500
            }
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
                touchThreshold: 10
            }
        }
    ]
};
