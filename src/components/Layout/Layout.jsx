import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
    const [counter,setCounter]=useState(0)
    useEffect(()=>{

    },[])
  return <>
<Navbar/>
<div className="container  mx-auto md:py-10 py-5   my-6">

  <Outlet/>
</div>
  <Footer/>
  </>
}
