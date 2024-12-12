import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
export default function Cart() {
let {products,RemoveCartItem,numOfCartItems,updateCartQuentity,totalCartPrice,clearAll}=useContext(CartContext)



  return <>
{products!==null?<div className="relative overflow-x-auto shadow-lg  sm:rounded-lg pt-8 mt-8 mx-4 md:mx-0">
  <div className='flex  items-center gap-3 px-3'>
  <i className='fa-brands fa-opencart text-3xl dark:text-orange-400'></i>
<h2 className='before:absolute before:h-3/4 before:w-0.5 before:-start-1 before:top-1/2 before:-translate-y-1/2 before:bg-slate-600 relative text-xl text-slate-600 font-semibold ps-2 dark:text-white'>Your shopping Cart</h2>

  </div>  


<div className='flex flex-col md:flex-row items-center justify-around'>
<div className="flex flex-col items-center grow py-4 text-center md:text-left">
      <p className="text-slate-600 font-semibold mt-2 px-3 text-xl dark:text-white">
        <i className="fa-solid fa-sack-dollar text-xl text-green-500 dark:text-orange-400"></i> Your Total Cart Price is <span className="font-bold text-green-500 dark:text-orange-400 ">{totalCartPrice}</span>
      </p>
      <p className="text-slate-600 font-semibold mt-2 px-3 text-xl dark:text-white">
    
        The num of cart items <span className="font-bold text-green-500 dark:text-orange-400">{numOfCartItems}</span>
      </p>
    </div>

  <button onClick={clearAll} className="btn w-fit bg-red-600 text-white hover:bg-red-800 dark:border-transparent mx-4">
        <i className="fa-solid fa-trash me-2"></i>Delete Cart
      </button>
</div>

<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">


{products?.length > 0 && (
         <thead className={`${style.thead} text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400`}>
         <tr>
           <th scope="col" className="px-16 py-3">
             <span className="col">Image</span>
           </th>
           <th scope="col" className="px-6 py-3">Product Name</th>
       
           <th scope="col" className="px-6 py-3 ">Quantity</th>
           <th scope="col" className="px-6 py-3">Price</th>
           <th scope="col" className="px-6 py-3">Action</th>
         </tr>
       </thead>
      )}
  <tbody >

  {products?.length>0?
  <> 

{  products?.map(prod=><tr key={prod.product.id} className={`${style.cart} relative bg-white border-b mt-5 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
  {/* img */}
      <td className='p-4'>
        <img src={prod.product.imageCover} className="md:w-24 md:h-24 rounded-full w-40 h-40  object-cover border" alt={prod.product.title} />
      </td>
      {/* title */}
      <td className={` px-6 md:py-4 p-1 font-semibold text-gray-900 dark:text-white`} >
  <Link to={`/productdetails/${prod.product.id}/${prod.product.category.name}`}>
  {prod.product.title}
  </Link>

      </td>
      {/* quantity */}
      <td className={`${style.quantity}  px-6 py-4 `}>
      <span className='md:hidden font-bold darK:text-white'>Quantity: </span> 
        <div className="flex items-center">
          <button onClick={()=>updateCartQuentity(prod.product.id,prod.count-1)} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>
          <div className="ms-3">
            <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={prod.count} required />
          </div>
          <button onClick={()=>updateCartQuentity(prod.product.id,prod.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      {/* price */}
      <td className={` px-6 md:py-4 p-1 mb-4 md:mb-0 font-semibold text-gray-900 dark:text-white`}>
   <span className='md:hidden font-bold '>Price: </span>{prod.price} EGP
      </td>
      {/* removeitem */}
      <td className="px-6 md:py-4 p-1">
        <span className={`${style.close} font-medium bg-red-600 text-white  h-[25px] w-[25px]  flex justify-center items-center rounded-full dark:text-red-500 cursor-pointer`} onClick={()=>RemoveCartItem(prod.product.id)}><i className='fa-solid fa-xmark dark:text-white'></i></span>
      </td>
    </tr>
     
      )}




<tr >
  <td colSpan='5' className='p-6 text-center'>

<Link to='/payment'><button className='btn text-cnter w-fit dark:hover:bg-orange-500 dark:border-orange-500 dark:text-white'>Pay Now</button></Link>
  </td>
</tr>
    </> 

      :<div className='text-center py-12 dark:border-white dark:border dark:rounded-md mt-5 dark:border-opacity-25 px-4 md:px-0'>
        <p className='text-xl text-slate-600 mt-2 dark:text-white'>opps! your cart is empty. start shopping now by clicing the button below and find something you love <i className='fa-solid fa-heart text-green-500 dark:text-orange-500 '></i> !</p>
        <button className='btn w-fit my-3 dark:border-orange-500 dark:hover:bg-orange-500 mt-5'><Link to='/'>Back To Home</Link></button>
        </div>}
<div>

</div>
  </tbody>
</table>

</div>:<Loading/>}





  </>
}
