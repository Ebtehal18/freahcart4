import React, { useEffect, useState } from 'react'
import style from './Card.module.css'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../context/WishListContext'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

export default function Card({recentPro}) {
  let {addToCart}=useContext(CartContext)
let {wishlist}=useContext(WishListContext)
// console.log(addToCart)

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
async function addToWishProduct(id){
  let toasting=toast.loading('Loading....')
  let {data}= await wishlist(id)

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


  return <>
 <div className='shadow-md  overflow-hidden relative  group dark:bg-white rounded-lg ' >
<Link to={`/productdetails/${recentPro.id}/${recentPro?.category?.name}`} className='  '>

<div className='overflow-hidden mb-3 '>
<img src={recentPro.imageCover} alt={recentPro.title} className='w-full group-hover:scale-[1.095] transition-all duration-300'/>
</div>
<div className='px-4 space-y-2' >
<span className='text-green-600 mt-3 dark:text-orange-500 font-bold '>{recentPro.category.name}</span>
  <h4 className=' font-normal text-gray-800  line-clamp-1'>{recentPro.title.split(' ').slice(0,2).join(' ')}</h4>

  <div className='flex justify-between items-center '>
    <span> {recentPro.price} EGP</span>
  <span> <i className='fa-solid fa-star text-yellow-300 '></i> {recentPro.ratingsAverage}</span>
</div>

</div>

  {recentPro?.priceAfterDiscount?<>
    <span className='line-through text-red-500 px-4 '>{recentPro?.priceAfterDiscount} EGP</span>
    <span className='rounded-b-md bg-red-500 md:p-1 px-4 py-3 text-white absolute top-0 start-0 text-lg dark:bg-sky-800 '>sale </span>
   </>:<div className='h-6'></div>}



</Link>
<span onClick={()=>addToWishProduct(recentPro.id)} className='group-hover:opacity-100 opacity-0 w-9 h-9 bg-green-400 text-white flex justify-center items-center rounded-full absolute top-3 end-3 transition-all duration-500 cursor-pointer dark:bg-orange-500 ' >
  <i className='fa-solid fa-heart text-xl'></i></span>
<div className=' w-[90%]  mx-auto mt-1 mb-4'>
<button onClick={()=>addToCartProduct(recentPro.id)} className='btn group-hover:translate-y-[0] group-hover:opacity-100 opacity-0 translate-y-[100%] transition-all duration-500 dark:border-orange-500 dark:hover:bg-orange-500 '>+ add to cart</button> 
</div>

  </div>
  
    
  </>
}
