import React, { createContext, useEffect, useState } from 'react'


export let DarkModeContext=createContext()

export default function DarkMOdeProvider({children}) {
  const [isDarkMode, setDarkMode] = useState(()=>{
    const savedTheme=localStorage.getItem("theme")
    return savedTheme==='dark'
  });


  const toogleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };


  useEffect(() => {
   localStorage.setItem('theme',isDarkMode?'dark':"light")
   if(isDarkMode){
    document.documentElement.classList.add("dark")
   } else{
    document.documentElement.classList.remove("dark")
   }
  }
 ,[isDarkMode]);


  return <DarkModeContext.Provider value={{isDarkMode,toogleDarkMode}}>
    {children}
  </DarkModeContext.Provider>
}
