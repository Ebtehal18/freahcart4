import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import sliderImg1 from '../../assets/images/slider-image-1.jpeg'
import sliderImg2 from '../../assets/images/slider-image-2.jpeg'
import sliderImg3 from '../../assets/images/slider-image-3.jpeg'
import sliderImg4 from '../../assets/images/slider-2.jpeg'
import sliderImg5 from '../../assets/images/grocery-banner-2.jpeg'


export default function MainSlider() {

  
    const settings = {
       dots: false,
    infinite: true,

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
   responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true 
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true 
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true 
        }
      }
    ]
  };
  return <>
 
<div className="row md:py-8 lg:mt-14 lg:py-14  xl:mt-0 xl:py-8 mb-6 sm:mb-0">
  <div className='lg:w-3/4 w-full mb-10 lg:mb-0'>
  <Slider {...settings}>

  <img src={sliderImg5} alt="slider1"  className='lg:h-[400px] h-[200px] object-cover'/>
  <img src={sliderImg3} alt="slider2"  className='lg:h-[400px] h-[200px] object-cover'/>
  <img src={sliderImg2} alt="slider3"  className='lg:h-[400px] h-[200px] object-cover'/>
  </Slider>
  </div>
<div className="lg:w-1/4 w-full">
<img src={sliderImg2} alt="slider4" className='lg:h-[200px] md:h-[200px] h-[150px] w-full object-cover object-right' />
<img src={sliderImg4} alt="slider5" className='lg:h-[200px] md:h-[200px] h-[150px] w-full object-cover object-right' />
</div>
</div>
  </>

}
