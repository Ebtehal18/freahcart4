import React, { useContext, useEffect, useState } from 'react'
import style from './Footer.module.css'
import amazon from '../../assets/images/amazon-pay.svg'
import amazonDark from '../../assets/images/amazonedark.svg'
import americanExpress from '../../assets/images/American-Express-Color.png'
import masterCard from '../../assets/images/mastercard.webp'
import payPal from '../../assets/images/paypal.png'

import appStore from '../../assets/images/get-apple-store.png'
import googlePlay from '../../assets/images/get-google-play.png'
import { DarkModeContext } from '../../context/DarkModeContext'

export default function Footer() {
let {isDarkMode}=useContext(DarkModeContext)
  return <>
<footer className='bg-slate-200 py-8 px-4 dark:bg-gray-800 '>
  <div className="container space-y-4">
<header>
<h2 className='text-2xl font-semibold text-slate-800 dark:text-white'>Get The FreshCart app</h2>
<p className='my-4 dark:text-white'>we will send you a link, open it on your phone to download the app</p>
</header>
<div className='flex flex-col space-y-2 md:flex-row gap-3 items-center'>
  <input type="email" placeholder='Email...' className='grow  form-control w-full md:w-fit' />
<button className='btn w-fit uppercase bg-primary-800 hover:bg-primary-900 text-white dark:bg-orange-500 dark:border-transparent'>Share App Link</button>
</div>
<div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:justify-between lg:items-center py-4 border-y-2 border-slate-300 border-opacity-50 '>
<div className="payment flex lg:flex-row items-center gap-3 justify-between w-full lg:w-fit">
  <h3 className='dark:text-white'>Payment Partners</h3>
<div className='flex items-center gap-3'>
<img src={isDarkMode?amazonDark:amazon} alt="amazon" className='lg:w-24 w-[70px]'/>
<img src={americanExpress} alt="american express"className='lg:w-24 w-[70px]' />
<img src={masterCard} alt="master card"className='lg:w-20 w-[60px]' />
<img src={payPal} alt="paypal"className='lg:w-24 w-[70px]' />
</div>
</div>
<div className="download flex items-center gap-3  lg:flex-row w-full lg:w-fit justify-between">
  <h3 className='dark:text-white'>Get deliveries with FreshCart</h3>
<div className='flex md:gap-2  '>
<img src={appStore} alt="app store" className='lg:w-24 w-[80px]' />
<img src={googlePlay} alt="google play" className='lg:w-[110px] w-[80px] me-10 md:me-0' />
</div>
</div>
</div>
  </div>
</footer>
  </>
}
