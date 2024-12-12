import React, { useEffect, useState } from 'react'
import style from './NoCaregoryBrandFound.module.css'
export default function NoCaregoryBrandFound() {
 
  return <>
<div className="h-screen flex justify-center items-center">
  <p className="text-red-500 text-lg">
    An error occurred while fetching products. Please try again later.
  </p>
</div>
  </>
}
