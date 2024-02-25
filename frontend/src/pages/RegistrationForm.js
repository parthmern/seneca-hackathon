import React, { useState } from 'react';
import { account, database } from '../appwriteConfig/config';
import { UserDetailsId, dbId } from '../utils/environmentVars';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange =  (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform any action with the username, password, and email, such as sending them to a server for registration
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);

    var toastId = toast.loading("trying to register");

    try{
        const name = username ;

        const reg = await account.create('unique()', email, password, name);
        console.log(reg);
    
        const creatingUserDetails =  await database.createDocument(dbId, UserDetailsId, "unique()",{
            name : username ,
            userId : reg.$id ,
        });
    
        console.log("creatingu", creatingUserDetails);
    
        // You can also reset the form fields if needed
        // setUsername('');
        // setPassword('');
        // setEmail('');

        toast.success("registration successfull");

        navigate("/login");
        toast.dismiss(toastId);
        
    }
    catch(error){
        console.log("erorr", error);
        toast.error("error in registration");
        toast.dismiss(toastId);
    }
    
    toast.dismiss(toastId);

  };

  return (
    <form className='flex flex-col gap-5 item-center justify-center mt-10 w-[50%] mx-auto ' onSubmit={handleSubmit}>
      <div className='flex items-center justify-evenly gap-x-5'>
        <label htmlFor="username"><p className='text-white font-bold' >Username</p></label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className='text-white'
        />
      </div>
      <div className='flex items-center justify-evenly gap-x-5'>
        <label className='text-white font-bold'  htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className='text-white'
        />
      </div>
      <div  className='flex items-center justify-evenly gap-x-5'>
        <label className='text-white font-bold'  htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className='text-white'
        />
      </div>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegistrationForm;
