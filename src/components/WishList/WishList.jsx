import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../context/WishListContext'
import toast from 'react-hot-toast'
import { CartContext } from '../../context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'


export default function WhshList() {
    let {displayWishList,wishProducts,wishcount, RemoveWishListItem}=useContext(WishListContext)
    let {addToCart}=useContext(CartContext)

async function addToCartProduct(id){
      let toasting=toast.loading('Loading....')
      let {data}= await addToCart(id)
    
      console.log(data)
    if(data.status==='success'){
      toast.success(data.message,{
        style: {
      backgroundColor:'rgb(14,159,110)',
      color:'#fff',
      icon:'💚'
    }
      },)
    toast.dismiss(toasting)
    }else{
      toast.dismiss(toasting)
      toast.error(data.message)
    }
    }


  return <>

{wishProducts!==null?
<div className="relative shadow-md sm:rounded-lg mt-8 dark:shadow-none py-8 mx-4 md:mx-0">
  {/* heading */}
  <div className="flex items-center gap-3 px-3 my-3">
    <div className="relative justify-center items-center flex">
      {wishcount > 0 ? (
        <span className="absolute text-white font-bold">{wishcount}</span>
      ) : null}
      <i className="fa-solid fa-heart text-3xl text-green-500 dark:text-orange-500"></i>
    </div>
    <h2 className="before:absolute before:h-3/4 before:w-0.5 before:-start-1 before:top-1/2 before:-translate-y-1/2 before:bg-slate-600 relative text-xl text-slate-600 font-semibold ps-2 dark:text-white">
      My WishList
    </h2>
  </div>

  {/* Table */}
  
  <div className="block w-full">
    <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
      {wishProducts?.length > 0 && (
         <thead className={`${style.thead} text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400`}>
         <tr>
           <th scope="col" className="px-16 py-3">
             <span className="sr-only">Image</span>
           </th>
           <th scope="col" className="px-6 py-3">Product Name</th>
           <th scope="col" className="px-6 py-3">Brand</th>
           <th scope="col" className="px-6 py-3">Price</th>
           <th scope="col" className="px-6 py-3">Add to cart</th>
           <th scope="col" className="px-6 py-3">Action</th>
         </tr>
       </thead>
      )}

<tbody>
  {wishProducts?.length > 0 ? (
    wishProducts.map((prod) => (
      <tr
        key={prod._id}
        className={`${style.wish} bg-white border-b relative dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50  dark:hover:bg-gray-700`}
      >
        {/* img */}
        <td className="p-4 ">
          <img
            src={prod.imageCover}
            className="md:w-24 md:h-24 rounded-full w-40 h-40  object-cover border"
            alt={prod.title}
          />
        </td>
        {/* title */}
        <td className="px-6 md:py-4 py-1 md:mt-5 font-semibold text-gray-900 dark:text-white">
     <Link  to={`/productdetails/${prod.id}/${prod.category.name}`}>     {prod.title}</Link>
        </td>
        {/* brand */}
        <td className="px-6 md:py-4 py-1 md:mt-5 text-gray-900 dark:text-white">
        <span className='dark:text-white md:hidden font-bold '>Brand: </span>  {prod?.brand?.name}</td>
        <td className="px-6 md:py-4 py-1 md:mt-5 font-semibold text-gray-900 dark:text-white">
       <span className='dark:text-white md:hidden font-bold '>Price: </span>   {prod.price} EGP
        </td>
        {/* add to cart */}
        <td className="px-6 md:py-4 py-1 md:mt-5 mb-5 mt-0 md:p-0 xl:px-6">
          <button
            className="btn  mt-3 transition-all duration-300 dark:border-orange-500 dark:hover:bg-orange-500 md:px-1 md:py-1 "
            onClick={() => addToCartProduct(prod._id)}
          >
            + add to cart
          </button>
        </td>
        <td className="px-6 md:py-4 py-1 md:mt-5">
          <span onClick={() => RemoveWishListItem(prod._id)} className={`font-medium bg-red-600 text-white  h-[25px] w-[25px] p-2 flex justify-center items-center rounded-full dark:text-red-500 cursor-pointer ${style.close}`}>
            <i className="fa-solid fa-xmark  text-white "></i>
          </span>
        </td>
      </tr>
    ))
  ) : (
    <div className='text-center  dark:border-white dark:border dark:rounded-md mt-5 dark:border-opacity-25 py-12'>
      <p
        className="text-xl text-slate-600 mt-2 dark:text-white"
      >
        Opps! Your WishList is empty.
      </p>
    </div>
  )}
</tbody>

    </table>
  </div>
</div>
  :<Loading/>}



  </>
}
