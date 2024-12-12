import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserContext'


export let CartContext=createContext()

export default function CartContextProvider({children}) {
let [numOfCartItems,setnumOfCartItems]=useState(0)
let [cartId,setcartId]=useState(null)
let [products,setproducts]=useState(null)
let [totalCartPrice,settotalCartPrice]=useState(0)
let {setUserLogin}=useContext(UserContext)


    let token={
        token:localStorage.getItem("userToken")
    }

// add to cart
 function addToCart(productId){

  return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
       productId
    },
    {
        headers:token
    
    }
).then(respnse=>{
    getCartItems()
    return respnse
}).catch(error=>{
    console.log(error)
    return error
})
}

// display cart items
 async function getCartItems(){
 axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:token
    })
    .then(response=>{

    console.log(response)
    setcartId(response.data.cartId)
    setnumOfCartItems(response.data.numOfCartItems)
    setproducts(response.data.data.products)
    settotalCartPrice(response.data.data.totalCartPrice)


    })
    .catch(error=>{
    console.log(error)

    })
}



// remove cart item 
function RemoveCartItem(id){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:token})
    .then(response=>{
            console.log(response)
            setcartId(response.data.cartId)
            setnumOfCartItems(response.data.numOfCartItems)
            setproducts(response.data.data.products)
            settotalCartPrice(response.data.data.totalCartPrice)
        
            })
            .catch(error=>{
            console.log(error)
        
            })
}

// updatte cart item quentity
function updateCartQuentity(id,count){
axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
count
},{
    headers:token
})
.then(response=>{
    console.log(response.data)
    setcartId(response.data.cartId)
    setnumOfCartItems(response.data.numOfCartItems)
    setproducts(response.data.data.products)
    settotalCartPrice(response.data.data.totalCartPrice)

})
.catch((error)=>{
    console.log(error)
})
}

// remove all Cart Items
function clearAll(){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:token})
    .then(response=>{
            console.log(response)
            setcartId(response.data.cartId)
            setnumOfCartItems(0)
            setproducts(response.data.data?.products)
            settotalCartPrice(0)
        
            })
            .catch(error=>{
            console.log(error)
        
            })
}



useEffect(()=>{
    const token = localStorage.getItem('userToken');
  if (token) {
    setUserLogin(token);

    getCartItems()

  }
},[])


  return <>
<CartContext.Provider value={{addToCart,products,setproducts,setnumOfCartItems,settotalCartPrice,RemoveCartItem,numOfCartItems,updateCartQuentity,totalCartPrice,clearAll,cartId,setcartId}}>
    {children}
</CartContext.Provider>
  </>
}


