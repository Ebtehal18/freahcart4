import React, { useEffect, useState } from 'react'
import style from './VerifyRestCode.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'


export default function VerifyRestCode() {
   let navigate =useNavigate() 
   let [loading,setLoading]=useState(false)

 function submitVerifyRestCode(val){
  setLoading(true)

axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,val)
.then(res=>{

  toast.success('Your can Reset The newpassword')
    navigate('/resetpassword')

})
.catch(error=>{
  console.log(error)
  toast.error("Please Enter Correct Code")
})
.finally(()=>{
  setLoading(false)
})
} 

let formik=useFormik({
  initialValues:
    {
  resetCode:""
  },

  onSubmit:submitVerifyRestCode
})

return<>
<div className='text-white'>
{formik.error}
</div>
<div className="mx-auto py-10 px-4 md:px-0">
<form className='max-w-xl mx-auto' onSubmit={formik.handleSubmit}>
<h2 className='font-bold md:text-4xl text-green-600 pb-10 dark:text-white text-2xl'>Verify Rest Code:</h2>
<div className="relative z-0 w-full mb-5 group">
    <input value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="tel" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder='' />
    <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your Rest Code:</label>
  </div>
  <button  disabled={!formik.isValid||!formik.dirty?true:false}  type="submit" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:disabled:bg-gray-300 dark:focus:ring-orange-800  disabled:bg-gray-300 dark:disabled:bg-gray-300 disabled:cursor-not-allowed">{loading?<i className='fa-solid fa-spinner px-1 fa-spin'></i>:'Submit'}</button>
</form>
</div>
</>


}
