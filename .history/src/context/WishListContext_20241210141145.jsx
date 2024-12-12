import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export let WishListContext=createContext(0)

export default function WisListContextProvider({children}){

let [wishProducts,setWishProducts]=useState(null)
let [wishcount,setwishCount]=useState(0)
let {setUserLogin}=useContext(UserContext)

    let token={
        token:localStorage.getItem("userToken")
    }


    function wishlist(productId){

        return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
             productId
          },
          {
              headers:token
          
          }
      ).then(respnse=>{

        getWishList()
console.log(respnse)
          return respnse
      }).catch(error=>{
          console.log(error)
          return error
      })
      }

      // display cart items
 function getWishList(){
       axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
          headers:token
      })
      .then(response=>{
        console.log(response)
          setWishProducts(response?.data?.data)
          setwishCount(response?.data?.count)
    
  
      })
      .catch(error=>{
      console.log(error)
  
      })
  }
  // remove cart item 
function RemoveWishListItem(id){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:token})
    .then(response=>{
    console.log(response)
    getWishList()
   
            })
            .catch(error=>{
            console.log(error)
        
            })
}



useEffect(()=>{
    const token = localStorage.getItem('userToken');
    if (token) {
        setUserLogin(token)
    getWishList()}
  },[])
    return <>
    <WishListContext.Provider value={{wishlist,wishProducts,wishcount,RemoveWishListItem,setWishProducts,setwishCount}}>
        {/* app */}
        {children}
    </WishListContext.Provider>
    </>
}