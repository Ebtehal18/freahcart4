import React, { useEffect, useState } from 'react'
import style from './DetailsCategorey.module.css'
import { Link, useParams } from 'react-router-dom'
import UseProducts from '../../hooks/UseProducts'
import Loading from '../Loading/Loading'
import Card from '../Card/Card'

export default function DetailsCategorey() {
let {categoryName}=useParams()

       
  let {data,isLoading,isError}= UseProducts({
    select:(data)=>data?.data?.data?.filter((product)=>product?.category?.name===categoryName)
  })



if(isLoading){
  return <Loading/>
}
if(isError){
  return  <div className="h-screen flex justify-center items-center">
   <p className="text-red-500 text-lg">
     An error occurred while fetching products. Please try again later.
   </p>
 </div>
 }

 if (data?.length === 0) {
  return (
    <div className="py-14 mt-8">
      <p className="text-lg py-20 text-gray-800 border-2 text-center border-gray-500 dark:border-white dark:border-opacity-25 rounded-lg border-opacity-20 shadow-md dark:text-white">
        No products found in this{" "}
        <span className="font-bold text-green-500 dark:text-orange-400">
          "{categoryName.toUpperCase()}"
        </span>.{" "}
        <span className="font-bold text-gray-950 dark:text-white">
          Stay tuned! New items are coming soon!{" "}
          <i className="fa-regular fa-clock text-green-500 text-2xl dark:text-orange-400"></i>
        </span>
      </p>
    </div>
  );
}
return <>
<h2 className='text-xl  px-4 md:mt-4 font-bold text-green-500 dark:text-orange-400 '>{categoryName} Category:</h2>
<div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 pb-12 pt-8 px-4 rounded-md'>
{data?.map(recentPro => <Card recentPro={recentPro} key={recentPro.id}/>)}
</div>

      

  </>
}
