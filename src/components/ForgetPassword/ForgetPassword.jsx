import React, { useEffect, useState } from 'react'
import style from './ForgetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

export default function ForgetPassword() {
  let [loading,setLoading]=useState(false)
  let navigate =useNavigate()
function submitForgetPass(val){

 setLoading(true)
axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,val)
.then(res=>{
  console.log(res)
  toast.success(res.data.message)
   navigate('/verifyrestcode')

})
.catch(error=>{
  console.log(error)
  toast.error("error")
})
.finally(()=>{
  setLoading(false)
})
}

let validate=Yup.object().shape({
  email:Yup.string().required('email is required').email('Email is not valid'),
})
let formik=useFormik({
  initialValues:{
    email:""
  },
  onSubmit:submitForgetPass,
  validationSchema:validate

})

return<>
<div className="mx-auto py-10 px-4 md:px-0">
<form className='max-w-xl mx-auto'onSubmit={formik.handleSubmit}>
<h2 className='font-bold md:text-4xl text-green-600 pb-10 dark:text-white text-2xl'>Reset Passward:</h2>
<div className="relative z-0 w-full mb-5 group">
    <input  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>

  {formik.errors.email && formik.touched.email?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.email}
</div>:null }
<button  disabled={!formik.isValid||!formik.dirty?true:false} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800  disabled:bg-gray-300 dark:disabled:bg-gray-300 disabled:cursor-not-allowed">{loading?<i className='fa-solid fa-spinner px-1 fa-spin'></i>:'Submit'}</button>
</form>
</div>
</>
}
