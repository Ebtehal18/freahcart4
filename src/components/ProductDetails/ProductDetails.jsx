import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import Card from '../Card/Card';
import ImageGallery from "react-image-gallery";


export default function ProductDetails() {
  let {addToCart}=useContext(CartContext)
let  {id,category}=useParams()


  const settings = {
    dots: true,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
       
         
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
          slidesToScroll: 1,
          dots: false,
     
        }
      }
    ],
  };



  async function addToCartProduct(id){
    let toasting=toast.loading('Loading....')
    let {data}= await addToCart(id)
  
    console.log(data)
  if(data.status==='success'){
    toast.success(data.message,{
      style: {
    backgroundColor:'rgb(14,159,110)',
    color:'#fff'
  }
    },)
  toast.dismiss(toasting)
  }else{
    toast.dismiss(toasting)
    toast.error(data.message)
  }
  }

const [productDetail,setProductDetail]=useState(null)
const [relatedProducts,setrelatedProducts]=useState([])

async function getProductDetail(id){

let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

setProductDetail(data.data)

}
// filter all products
async function getRelatedProducts(category){
let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
let allProducts=data.data
console.log(allProducts)
let relatedProducts=allProducts.filter((relatedPro)=>relatedPro?.category?.name===category)
setrelatedProducts(relatedProducts)

}

    useEffect(()=>{
      getProductDetail(id)
      getRelatedProducts(category)
    },[id,category])



  return <>
  {/* datails of the products  */}
  {productDetail!==null?<div className="grid lg:grid-cols-[1fr_2fr] gap-5 items-center py-10 md:grid-cols-2 px-4 xl:px-0">
  <div className='relative mb-4 lg:mb-0 w-full overflow-hidden'>


    {<ImageGallery showPlayButton={false} showNav={false} disableKeyDown={true} items={productDetail.images.map((img)=>{
      return {
          original: img,
          thumbnail: img,
          originalAlt:productDetail.title,
          thumbnailAlt:productDetail.title,
        }
     
    })} /> }
    {productDetail?.priceAfterDiscount?
      <span className='rounded-b-md bg-red-500 md:p-1 px-4 py-3 text-white absolute top-0 start-0 text-lg dark:bg-sky-800 '>sale </span>
   :null}
  </div>

<div className='px-4 space-y-4 '>
<div>
<h4 className='text-2xl font-bold  text-gray-950 dark:text-white'>{productDetail?.title}</h4>
  <h3 className='font-bold text-green-500 my-2 dark:text-orange-500'>{productDetail?.category?.name}</h3>
</div>
<p className='text-xl text-gray-500 dark:text-white'>{productDetail?.description}</p>

  
  <div className='flex justify-between items-center  my-4'>
    <div className='flex gap-4'>
    <span className='dark:text-white'>{productDetail?.price} EGP</span>
    {productDetail?.priceAfterDiscount?
    <span className='line-through text-red-500 dark:text-white '>{productDetail?.priceAfterDiscount} EGP</span>
   :null}
    </div>


    <span className='dark:text-white'> <i className='fa-solid fa-star text-yellow-300'></i> {productDetail?.ratingsAverage}</span>
  </div>

  <button className='btn transition-all duration-500 dark:text-white dark:border-orange-500 dark:hover:bg-orange-500'onClick={()=>addToCartProduct(productDetail.id)} >+ add to cart</button>
</div>

</div>
:<div className='flex justify-center items-center h-screen'>
<Loading/>
   </div>}



{/* filterd products */}
{relatedProducts.length > 0 ? (
<>
<div className='px-4 xl:px-0'>
<h2 className='md:text-4xl mb-5 text-green-500 dark:text-white text-xl px-4 md:px-0 font-bold'>Related Products</h2>
  <Slider {...settings}>
    {relatedProducts.map((recentPro) => <div key={recentPro.id} className='px-2'>
          <Card recentPro={recentPro}  />
        </div>
    )}
  </Slider>
</div>
</>
) : (
  <Loading />
)}


  </>
}
