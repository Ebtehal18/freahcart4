import React, { useEffect, useState } from 'react'
import style from './RestPassword.module.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import * as Yup from 'yup'

export default function RestPassword() {
  let navigate =useNavigate() 
  let [loading,setLoading]=useState(false)
  let [loginPassType,setLoginPassType]=useState(true)

  function handelLoginPass(){
    setLoginPassType(!loginPassType)
  }

  function submitRestPassword(val){
    setLoading(true)
 axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,val)
 .then(res=>{
   console.log(res)
   toast.success('Your Paaword has been reset successfully')
    navigate('/login')
 })
 .catch(error=>{
   console.log(error)
   toast.error("error")
 }).finally(()=>{
  setLoading(false)
})
 } 
 let validate=Yup.object().shape({
  email:Yup.string().required('email is required').email('Email is not valid'),
  newPassword:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,10}$/,'invalid password should start with capital letter and contains number min 6 and max 10')
})

 let formik=useFormik({
   initialValues:
   {
    email:"",
    newPassword: ""
},
 
   onSubmit:submitRestPassword,
   validationSchema:validate
 })
 
 return<>
 <div className="mx-auto py-10 px-4 md:px-0">
 <form className='max-w-xl mx-auto' onSubmit={formik.handleSubmit}>
 <h2 className='font-bold md:text-4xl text-green-600 pb-10 dark:text-white text-2xl'>New Password:</h2>
 <div className="relative z-0 w-full mb-5 group">
     <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
     <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email:</label>
   </div>
   {formik.errors.email && formik.touched.email?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.email}
</div>:null }

  
 <div className="relative z-0 w-full mb-5 group">
     <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}   type={loginPassType?'password':'text'}  name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
       <span onClick={handelLoginPass} className='absolute end-0 top-[50%] -translate-y-[50%] text-[19px] dark:text-white'>{loginPassType?<IoEyeOff/>:< IoEye/>  } </span>
     <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your new password:</label>
   </div>
  
   {formik.errors.newPassword && formik.touched.newPassword?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.newPassword}
</div>:null }

   <button disabled={!formik.isValid||!formik.dirty?true:false} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800  disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-300">{loading?<i className='fa-solid fa-spinner px-1 fa-spin'></i>:'Submit'}</button>
 </form>
 </div>
 </>
 
}
