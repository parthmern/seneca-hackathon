import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider( {children} )                            
{
   const [login,setLogin] = useState(false);
   const [loginEmail,setLoginEmail] = useState(null);
   const [userDocId, setUserDocId] = useState(null);


   const value = {           
   login,
   setLogin,
   loginEmail,
   setLoginEmail,
   userDocId,
   setUserDocId,
   }


   return <AppContext.Provider value={value}>    
        {children}                                
    </AppContext.Provider>;

}