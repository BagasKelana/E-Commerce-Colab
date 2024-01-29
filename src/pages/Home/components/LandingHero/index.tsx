import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landing-page.css';

import { useState } from 'react';
import Slider, { Settings } from 'react-slick';

import { NextArrow, PrevArrow } from '@/components/Carousel/Arrow';
import { cn } from '@/lib/utils';

// const img = [
//     '/images//discount/discount1.jpg',
//     '/images//discount/discount2.jpg',
//     '/images//discount/discount3.jpg'
// ];

const banner = [
  '/images/id-50009109-b36a2f24939caa00a796df79fd0e0c99_xxhdpi.png',
  '/images/id-50009109-96e46f7e61898a3baddbae5f7d65f1e5_xxhdpi.png'
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
        <ul className="dots-list flex justify-center p-2"> {dots} </ul>
      </div>
    ),
    customPaging: (index) => (
      <div
        className={cn(
          'h-2 w-2 bg-slate-200/50 hover:bg-slate-200 rounded-full transition duration-200 ease-in-out ',
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
    <div className="h-full relative w-full md:px-6 xl:px-16">
      <Slider {...settings}>
        {banner.map((img) => (
          <img
            key={img}
            className="object-cover object-center h-full w-full overflow-hidden"
            src={img}
            alt="img-slider"
          />
        ))}
      </Slider>
    </div>
  );
};

export default LandingHero;
