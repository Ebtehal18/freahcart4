import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NoCaregoryBrandFound from '../NoCaregoryBrandFound/NoCaregoryBrandFound'
import { Helmet } from 'react-helmet'


export default function Brands() {
 
  function getBrands(){
    return   axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
     }
   
    let {data,isLoading,isError}= useQuery({
       queryKey:'getAllBrands',
       queryFn:getBrands,
       select:(data)=>data.data.data
     })
    


   if(isLoading) {
     return  <Loading/>
       
   }
   if(isError){
     return <NoCaregoryBrandFound/>
   }
   
     return <>
       <Helmet>
      <title>Fresh Cart - Brands</title>
         </Helmet>
   <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-5 py-12 px-4'>
   {data.map(product => <div className='shadow-md dark:shadow-sm relative overflow-hidden group rounded-lg' key={product.id}>
   <Link to={`/detailsbrand/${product?.name}`} className='grid grid-row-6'> 
     <img src={product.image} alt={product.name} className='w-full'/>
   </Link>

     </div>)
     }
       
   </div>
   
   
         
   
     </>
}
