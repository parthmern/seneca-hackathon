import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export const Navbar = () => {


    const {login, loginEmail, userDocId} = useContext(AppContext);

  return (
    <div className='h-[80px] text-black bg-yellow-500'>
        
        <p>logo</p>

        <p>
            {login ? "loggedin" : "not loginned"}
        </p>

        <p>
            {loginEmail}
        </p>
        


    </div>
  )
}
