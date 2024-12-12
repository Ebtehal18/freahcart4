import React, { useContext, useEffect, useState } from 'react'
import style from './Payment.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Payment() {
  let navigate =useNavigate()
  let [loadingCash,setLoadingcash]=useState(false)
  let [loadingOnline,setLoadingonline]=useState(false)
  let [isOnline,setIsonline]=useState(false)
  let {cartId,settotalCartPrice,setnumOfCartItems,setproducts}=useContext(CartContext)
  let user={
    details: "",
    phone: "",
    city: ""
    }

    let token={
      token:localStorage.getItem('userToken')
    }

// pay cash
 function handelPaymentSubmit(values){
  let apiObj={
    shippingAddress:values
  }
setLoadingcash(true)
 axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,apiObj,{headers:token})
 .then(response=>{
toast.success('product will come soon......')
setproducts([])
setnumOfCartItems(0)
settotalCartPrice(0)
navigate('/cart')
 })
 .catch(error=>{
  console.log(error)
 })
 .finally(()=>{
  setLoadingcash(false)
})
}


// payonline
function handelOnlinePayment(values){
    let apiObj={
        shippingAddress:values
      }
      setLoadingonline(true)
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,apiObj,{
    headers:token
  })
  .then(response=>{
    let{data}=response
    window.open(data.session.url)
    

  }).catch(error=>{
    console.log(error)
  })
  .finally(()=>{
    setLoadingonline(false)
  })
}

function detectPayment(values){
if (isOnline){
  handelOnlinePayment(values)
}else{
  handelPaymentSubmit(values)
}
}
    let validate =Yup.object().shape({
      details:Yup.string().required('Address is required!').min(5,'minlength is 5').max(20,'maxlength is 20'),
      phone:Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/,'phone must be a valid egyption number'),
      city:Yup.string().required('City is required')
      
    })
    let formik=useFormik({
      initialValues:user,
      validationSchema:validate,
      onSubmit:detectPayment
    })
  
    return <>
     <div className="mx-auto py-10">
    <form className='max-w-xl mx-auto px-4 md:px-0' onSubmit={formik.handleSubmit}>
    
    <h2 className='font-bold md:text-4xl text-green-600 pb-10 dark:text-white text-2xl'>Pay Now:</h2>
    
    
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
    <label htmlFor="addetails" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Details:</label>
  </div>
  {formik.errors.details && formik.touched.details?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.details}
</div>:null }


<div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  placeholder=''  />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Phone:</label>
  </div>
  {formik.errors.phone && formik.touched.phone?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.phone}
</div>:null }

<div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  placeholder=''  />
    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your City:</label>
  </div>
  {formik.errors.city && formik.touched.city?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.city}
</div>:null }

<button disabled={!formik.isValid|| !formik.dirty?true:false} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:hover:bg-orange-700 dark:focus:ring-green-800 disabled:bg-gray-300 dark:bg-orange-500 dark:disabled:bg-gray-300 disabled:cursor-not-allowed "
onClick={()=>{setIsonline(false)}}>{loadingCash?<i className='fa-solid fa-spinner px-1 fa-spin'></i>:'Pay Cash'}</button>

<button disabled={!formik.isValid|| !formik.dirty?true:false} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-orange-700 dark:focus:ring-green-800 disabled:bg-gray-300 dark:bg-orange-500 dark:disabled:bg-gray-300 disabled:cursor-not-allowed "
onClick={()=>{setIsonline(true)}}>{loadingOnline?<i className='fa-solid fa-spinner px-1 fa-spin'></i>:'Pay Online'}</button>
        </form>
        </div>
  </>  
}
  