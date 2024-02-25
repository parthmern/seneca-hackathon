import React, { useContext, useState } from 'react';
import { account, database } from '../appwriteConfig/config';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { UserDetailsId, dbId } from '../utils/environmentVars';
import { Query } from 'appwrite';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login,setLogin,loginEmail,setLoginEmail,userDocId,setUserDocId} = useContext(AppContext);


  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can add your login logic here, e.g., call an authentication API
    console.log('Email:', email);
    console.log('Password:', password);
    

    try{
        // trying to login using appwrite
        const res = await account.createEmailSession(email, password);
        console.log(res);

        if(res){
            setLogin(true);
            setLoginEmail(res.providerUid);
            //console.log("login =>",login, loginEmail);
            

            // finding collection which has same userId
            const collection = await database.listDocuments(dbId, UserDetailsId, [Query.equal("userId", `${res.userId}`)]	);
            console.log(collection);
            
            //setUserId(login.$id);
            setUserDocId(collection.documents[0].$id);

            navigate("/");


        }

    }

    catch(error){
        console.log("error=>", error);
    }


    console.log("userDOOOC ID=>",userDocId);
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
