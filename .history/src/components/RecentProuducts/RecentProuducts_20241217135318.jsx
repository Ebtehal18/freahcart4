import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProuducts.module.css'
import Loading from '../Loading/Loading'
import UseProducts from '../../hooks/UseProducts'
import Card from '../Card/Card'


export default function RecentProuducts() {

let [search,setSearch]=useState("")
let {data,isError,isLoading}=  UseProducts()

let filteredProducts=data?.data?.data?.filter((product)=>product.title.toLowerCase().includes(search.toLowerCase()))
if(isLoading){
  return  <Loading/>  
}
if(isError){
  return <div>errror</div>
}

  return <>
  <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-12 mx-4" placeholder="search..."></input>
<div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 py-12 px-4 r'>
{filteredProducts?.map(recentPro =><Card recentPro={recentPro} key={recentPro.id}/>)}
</div>

  </>

}
