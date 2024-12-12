import React, {  useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { CartContext } from '../../context/CartContext'
// useContext
export default function Register() {
let [passType,setPassType]=useState(true)
let [repassType,setRepassType]=useState(true)
let [error ,setError]=useState(null)
let navigate=useNavigate()
let[loading,setLoading]=useState(false)
let {setUserLogin}=useContext(UserContext)
let {getCartItems}=useContext(CartContext)

function handelPassType(){
  setPassType(!passType)
}
function handelRepassType(){
  setRepassType(!repassType)
}


// console.log(x)





// validat using Yup
let validate=Yup.object().shape({
  name:Yup.string().max(10,'name maxlength is 10').min(3,'name minlength is 3').required('name is required'),
  email:Yup.string().required('email is required').email('Email is not valid'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,10}$/,'invalid password should start with capital letter and contains number min 6 and max 10'),
  rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'not match password'),
  phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone must be a valid egyption number')
})
let user={
  name:"",
  email:"",
  password:"",
  rePassword:"",
  phone:"",
}

async function sumitForm(values){
  // submit form 
  setLoading(true)

await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
.then((response)=>{
  console.log(response)
  localStorage.setItem('userToken',response.data.token)
setUserLogin(response?.data?.token)

  navigate('/')

})
.catch((error)=>{
  console.log(error)
  setError(error?.response?.data?.message)
})
.finally(()=>{
  setLoading(false)
})
}

let formik=useFormik({
initialValues:user,
onSubmit:sumitForm,
validationSchema:validate
})





 return <>
<div className="mx-auto py-8 max-w-xl px-4 md:px-0 ">
<h2 className='font-bold md:text-4xl text-green-600 pb-10 dark:text-white text-2xl'>Register Now:</h2>


<form  onSubmit={formik.handleSubmit}>
  
  {/* catching the error  */}
{error&&  <div className="p-4 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
  {error}
</div>}

  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer " placeholder=''  />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Name</label>
  </div>
{formik.errors.name && formik.touched.name?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.name}
</div>:null }


  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=''  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Email</label>
  </div>
  {formik.errors.email && formik.touched.email?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.email}
</div>:null }

  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type={passType?'password':'text'} name="password" id="password" className="relative block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
    <span onClick={handelPassType} className='absolute end-0 top-[50%] -translate-y-[50%] text-[19px] dark:text-white'>{passType?<IoEyeOff/>:< IoEye/>  } </span>

    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">Enter your Password</label>
  </div>
  {formik.errors.password && formik.touched.password?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.password}
</div>:null }


  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} type={repassType?'password':'text'}  name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer relative"  placeholder='' />
    <span onClick={handelRepassType} className='absolute end-0 top-[50%] -translate-y-[50%] text-[19px] dark:text-white'>{repassType?<IoEyeOff/>:< IoEye/>  } </span>
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your RePassword</label>
  </div>
  {formik.errors.rePassword && formik.touched.rePassword?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.rePassword}
</div>:null }


  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"  placeholder=''  />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Phone:</label>
  </div>
  {formik.errors.phone && formik.touched.phone?   <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-white" role="alert">
  {formik.errors.phone}
</div>:null }


<div className='flex items-center justify-between'>

 <button disabled={!formik.isValid|| !formik.dirty?true:false} type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 disabled:bg-gray-300 dark:disabled:bg-gray-300 disabled:cursor-not-allowed ">{loading?<i className='fa-solid fa-spinner px-1 fa-spin'></i>:'Register'}</button>
 <p className='dark:text-white'>Aleady have an account ? <span className='font-semibold'><Link to='/login'>Login</Link></span></p>
</div>
</form>

</div>
 </>
}

