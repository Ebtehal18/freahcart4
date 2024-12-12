import { createContext, useEffect, useState } from "react";

export let UserContext=createContext(0)

export default function UserContextProvider({children}){
let [userLogin,setUserLogin]=useState(null)

useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      setUserLogin(localStorage.getItem("userToken"))
    }
        },[])


        
    return <UserContext.Provider value={{userLogin,setUserLogin}}>
        {children}
    </UserContext.Provider>
}