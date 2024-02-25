import React, { useState } from 'react';
import { account, database } from '../appwriteConfig/config';
import { UserDetailsId, dbId } from '../utils/environmentVars';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
    }
    catch(error){
        console.log("erorr", error);
    }
  };

  return (
    <form className='text' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
