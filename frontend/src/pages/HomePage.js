import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const {login, loginEmail, userDocId} = useContext(AppContext);

  const navigate = useNavigate();

  console.log("oooooooo=>>",userDocId);

  return (
    <div className='text-white'>HomePage { loginEmail } {userDocId} <p onClick={()=> {navigate("/user-details")}}>update detaisl</p></div>
  )
}

export default HomePage;