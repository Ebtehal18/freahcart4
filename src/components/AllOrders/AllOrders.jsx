import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import NoCaregoryBrandFound from '../NoCaregoryBrandFound/NoCaregoryBrandFound';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
 let token=localStorage.getItem('userToken')
  let {id}=jwtDecode(token)

 function getAllOrders(){
return   axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

}
let {data,isLoading,isError}=useQuery({
  queryKey:'getAllOrders',
  queryFn:getAllOrders,
  select:(data)=>data.data
})
if(isError){
  return <NoCaregoryBrandFound/>
}
if(isLoading) {
  return <Loading/>

}


  return <>
    <Helmet>
      <title>Fresh Cart - Allorders</title>
         </Helmet>
<div className="orders mt-8 py-12 flex flex-col space-y-4 px-4">
<div className='flex  items-center gap-3 px-3'>
<i class="fa-solid fa-truck text-3xl text-green-500 dark:text-orange-500"></i>
<h2 className='before:absolute before:h-3/4 before:w-0.5 before:-start-1 before:top-1/2 before:-translate-y-1/2 before:bg-slate-600 relative text-xl text-slate-600 font-semibold ps-2 dark:text-white'>Your Orders</h2>

  </div>  

{data.length>0?data.map((data)=><div key={data.id} className="border-2 p-8 border-gray-500 border-opacity-25 rounded-lg ">
<header className='flex justify-between items-center'>
<div className='flex flex-col'>
<h3 className='text-gray-500 dark:text-white'>Order Id </h3>
<span className='text-lg font-semibold text-gray-700 dark:text-white'>#{data.id}</span>
</div>
<div className="btns flex flex-col md:flex-row items-center gap-3 ">
  <button className={`btn border-transparent w-fit ${data.isPaid?'bg-lime-500 hover:bg-lime-800':'bg-red-500 hover:bg-red-800'} text-white  `}>{data.isPaid?'Paid':'Unpaid'} </button>
  <button className={`btn border-transparent w-fit ${data.isDelivered?'bg-lime-500 hover:bg-lime-800':'bg-blue-600 hover:bg-blue-800'} text-white `}>{data.isDelivered?'delivered':'Pending delivery'  } </button>
</div>
</header>

<div className="order grid lg:grid-cols-4 md:grid-cols-3  xl:grid-cols-6 md:gap-4 mt-5 px-3">

{data.cartItems.map(product=>{
  return <div key={product._id} className="product border overflow-hidden dark:bg-white border-gray-400 border-opacity-30 rounded-lg  mb-4 lg:mb-0">
  <img src={product.product.imageCover} alt={product.product.title} className='w-full' />
 <div className='p-3 space-y-2'>
 <h3 className='text-lg font-semibold'><Link to={`/productdetails/${product.product.id}/${product?.product?.category?.name}`}>{product.product.title.split(' ').slice(0,2).join(' ')}</Link></h3>
  <div className='flex justify-between items-center'>
  
  <p><span className='font-semibold underline'>count:</span> {product.count}</p>
  <span>{product.price} EGP</span>
  </div>
 </div>
  </div>
})}
</div>
<p className='mt-4 text-xl dark:text-white'> Your Total Order Price is <span className='font-bold text-green-500 dark:text-orange-500'>{data.totalOrderPrice}</span> EGP</p>
</div>):
<div className='text-center py-12 border-2 rounded-xl shadow-md dark:border-opacity-25 dark:border-white'>
  <p className='text-xl text-slate-600 mt-2 dark:text-white  '>opps! You have No orders Yet!</p>
   </div>
        }
</div>
  </>
}
