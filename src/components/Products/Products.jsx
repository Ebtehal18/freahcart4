import React, { useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import UseProducts from '../../hooks/UseProducts'
import Card from '../Card/Card'
import { Helmet } from 'react-helmet'


export default function Products() {
let {data,isError,isLoading}=  UseProducts()

    
   if(isLoading) {
     return <div className='flex justify-center items-center h-screen'>
      <Loading/>
          </div>
   }
   if(isError){
     return <div>errror</div>
   }
   
     return <>
     <Helmet>
      <title>Fresh Cart - Products</title>
         </Helmet>
   <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 py-12 px-4'>
   {data?.data?.data.map(recentPro => <Card key={recentPro.id}  recentPro={recentPro}/>)}
   
   
         
   
      </div>
      </>
}
