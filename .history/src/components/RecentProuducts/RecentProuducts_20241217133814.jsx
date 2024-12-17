import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProuducts.module.css'
import Loading from '../Loading/Loading'
import UseProducts from '../../hooks/UseProducts'
import Card from '../Card/Card'


export default function RecentProuducts() {


let {data,isError,isLoading}=  UseProducts()

if(isLoading){
  return  <Loading/>  
}
if(isError){
  return <div>errror</div>
}

  return <>
  <input type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-14" placeholder="search..."></input>
<div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 py-12 px-4 r'>
{data?.data?.data?.map(recentPro =><Card recentPro={recentPro} key={recentPro.id}/>)}
</div>

  </>

}
