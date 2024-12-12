import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
// axios
export default function CategoriesSlider() {

  const [categoriesProducts,setcategoriesProducts]=useState([])
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  async function getCategoriesProducts(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setcategoriesProducts(data.data)
    }

    useEffect(()=>{
      getCategoriesProducts()
    },[])


  return <>
  <h2 className='text-xl mb-2 px-4 xl:px-0 text-gray-900 dark:text-white'>Shop Popular Categories</h2>
  <Slider {...settings} className='mb-5 '>
     {categoriesProducts.map((categoreyProd=> <div key={categoreyProd.id}>
      <img src={categoreyProd.image} alt={categoreyProd.name} className='h-[200px] object-cover w-full' /> 
      <h4 className='my-2 ps-2 text-green-500 text-xl dark:text-white '>{categoreyProd.name}</h4>
     </div>
     
      ))}
    </Slider>
  </>
}
