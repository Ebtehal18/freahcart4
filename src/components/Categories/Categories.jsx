import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'
import NoCaregoryBrandFound from '../NoCaregoryBrandFound/NoCaregoryBrandFound'
import { Helmet } from 'react-helmet'

export default function Categories() {
  function AllCategories(){
 return   axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
 let {data,isError,isLoading}=useQuery({
queryKey:"getAllCategories",
queryFn:AllCategories
 })
console.log(data)

 if(isLoading) {
  return <Loading/>

}
if(isError){
 return <NoCaregoryBrandFound/>
}


  return <>
    <Helmet>
      <title>Fresh Cart - Categories</title>
         </Helmet>
<div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5 md:py-12 px-4  '>
{data?.data?.data?.map(category => <div className='shadow-md  relative overflow-hidden group rounded-lg cursor-pointer  dark:bg-white' key={category.id}>
<Link to={`/detailscategorey/${category.name}`}>
  <img src={category.image} alt={category.title} className='w-full md:h-[350px] object-cover h-[200px] '/>

<h2 className='font-semibold text-green-500 py-4 text-center dark:text-orange-500 ' >{category.name}</h2>
</Link>


</div>
)}
    </div>


  </>
}
