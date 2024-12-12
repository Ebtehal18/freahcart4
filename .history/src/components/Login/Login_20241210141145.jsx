import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { CartContext } from '../../context/CartContext'

export default function Login() {

let {getCartItems}=useContext(CartContext)
let [loginPassType,setLoginPassType]=useState(true)
let [error ,setError]=useState(null)
let navigate=useNavigate()
let[loading,setLoading]=useState(false)
let {setUserLogin}=useContext(UserContext)

function handelLoginPass(){
  setLoginPassType(!loginPassType)
}

let user={
    name:"",
    email:"",
  }

async function sumitForm(values){
  setLoading(true)



await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
.then((response)=>{
  // sucess
  console.log(response)
  setUserLogin(response.data.token)
  localStorage.setItem('userToken',response.data.token)
  navigate('/')

})
.catch((error)=>{

  setError(error?.response?.data?.message)
})
.finally(()=>{
  setLoading(false)
})


  }

// validat using Yup
let validate=Yup.object().shape({
  email:Yup.string().required('email is required').email('Email is not valid'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,10}$/,'invalid password should start with capital letter and contains number min 6 and max 10')
})


let formik=useFormik({
initialValues:user,
onSubmit:sumitForm,
validationSchema:validate
})



 return <>
<div className="mx-auto py-10 px-4 md:px-0">
<form className='max-w-xl mx-auto' onSubmit={formik.handleSubmit}>

<h2 className='font-bold md:text-4xl text-green-600 pb-10 dark:text-white text-2xl'>Login Now:</h2>

{error&&  <div className="p-4 mb-5 text-sm text-red-800 rounded-lg text-center bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {error}
</div>}

  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>
  {formik.errors.email && formik.touched.email?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.email}
</div>:null }

  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type={loginPassType?'password':'text'} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer relative" placeholder='' />
    <span onClick={handelLoginPass} className='absolute end-0 top-[50%] -translate-y-[50%] text-[19px] dark:text-white'>{loginPassType?<IoEyeOff/>:< IoEye/>  } </span>

    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Password</label>
  </div>
  {formik.errors.password && formik.touched.password?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.password}
</div>:null }







<div className='flex items-center justify-between'>
<button disabled={!formik.isValid||!formik.dirty?true:false} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800  disabled:bg-gray-300 dark:disabled:bg-gray-300 disabled:cursor-not-allowed">{loading?<i className='fa-solid fa-spinner px-1 fa-spin'></i>:'Login'}</button>
<p className='font-semibold cursor-pointer text-white'><Link to='/forgetpassword'>Forget PassWord?</Link></p>

</div>
<p className='mt-2 dark:text-white'>didn't have account yet ? <span className='font-semibold dark:text-white'><Link to='/register'>Register</Link></span></p>

</form>

</div>
 </>
}

