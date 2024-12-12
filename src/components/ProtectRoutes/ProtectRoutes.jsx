import React from 'react'
import style from './ProtectRoutes.module.css'
import { Navigate } from 'react-router-dom'

// Navigate
export default function ProtectRoutes({children}) {

if(localStorage.getItem('userToken')!==null){
  return children
}else{
  return <Navigate to='/login' />
}


}
