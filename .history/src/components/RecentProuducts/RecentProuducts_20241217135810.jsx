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
 
<div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-5 py-12 px-4 '>
{filteredProducts?.map(recentPro =><Card recentPro={recentPro} key={recentPro.id}/>)}
</div>

  </>

}
