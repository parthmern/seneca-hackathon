import React, { useState } from 'react';
import axios from 'axios';
import { Databases } from 'appwrite';
import { client, database } from '../appwriteConfig/config';
import { UserDetailsId, dbId } from '../utils/environmentVars';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Switch } from "../components/ui/switch"

import { Button } from "../components/ui/button"

import { Label } from "../components/ui/label"

import { Textarea } from "../components/ui/textarea"


const UserDetails = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState([]);
  const [smoking, setSmoking] = useState(false);
  const [file, setFile] = useState();
  const [bio, setBio] = useState('');


  const handleInterestChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform any additional logic, such as sending data to a server
    console.log({ name, gender, interests, smoking, bio });
    

    try {

      var toastId = toast.loading("Loading...")

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'xas6zgld');
      formData.append('folder', 'senecaApp');
  
      const imageUpload = await axios.post(
        'https://api.cloudinary.com/v1_1/dncm3mid4/image/upload',
        formData
      );
      console.log(imageUpload.data.secure_url);
      const profileImg = imageUpload.data.secure_url ;

        const response = await database.createDocument(dbId, UserDetailsId, "unique()",{
            name,
            gender,
            interest : interests,
            smoking,
            profileImg,
            bio
        });
        
        console.log('Record updated successfully:', response);
        toast.success("userdetails updated");

        const res = await database.listDocuments('65d93215af46d0861583', '65d932540eace0dc8ca1');
        console.log(res);
        toast.dismiss(toastId);

      } catch (error) {
        console.error('Error updating record:', error);
        toast.error("user details not updated");
        toast.dismiss(toastId);
      }
  };

  return (
    <div className='text-white w-[50%] mx-auto'>
      <h2>User Details</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label className='font-bold'>
          Name:
          
          <Input className='' required type="text" value={name} onChange={(e) => setName(e.target.value)} />

        </label>
        <br />
        <label className='font-bold'>
          Gender:
          {/* <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select> */}

          <Select Value={Select.Value} onValueChange={(e)=>{console.log(e); setGender(e); }}>
            <SelectTrigger   className="w-[180px]">
              <SelectValue   placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem  value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>


        </label>
        <br />
        <div className='font-bold'>Interests:
        <br/>

        <div className='flex flex-col '>
              <label>
              Cooking
              <input
              className='ml-5'
                type="checkbox"
                value="cooking"
                checked={interests.includes('cooking')}
                onChange={handleInterestChange}
              />
            </label>
            <label>
              Music
              <input
                className='ml-5'
                type="checkbox"
                value="music"
                checked={interests.includes('music')}
                onChange={handleInterestChange}
              />
            </label>
            <label>
              Movie
              <input
                className='ml-5'
                type="checkbox"
                value="movie"
                checked={interests.includes('movie')}
                onChange={handleInterestChange}
              />
            </label>
            <label>
              Cricket
              <input
                className='ml-5'
                type="checkbox"
                value="cricket"
                checked={interests.includes('cricket')}
                onChange={handleInterestChange}
              />
            </label>
            <label>
              Tennis
              <input
                className='ml-5'
                type="checkbox"
                value="tennis"
                checked={interests.includes('tennis')}
                onChange={handleInterestChange}
              />
            </label>
          </div>

        </div>
        <br />

        <br />
        <label className='flex font-bold items-center gap-x-5'>
          Smoking:
          {/* <input type="checkbox" checked={smoking} onChange={(e) => setSmoking(e.target.checked)} /> */}
          <Switch  onCheckedChange={(e) =>{ console.log("smoking", e); setSmoking(e)}} />
        </label>
        <br />

        <label >
          Bio :
          <Textarea placeholder="Type your bio here." onKeyUp={(e)=> {console.log(e.target.value); setBio(e.target.value); }} />
        </label>

        <div className="grid w-full max-w-sm items-center mt-3 gap-1.5">
          <Label className='font-bold' htmlFor="picture">Profile Image: </Label>
          <Input onChange={(e)=> {console.log(e.target.files[0]); setFile(e.target.files[0])}} id="picture" type="file" accept=".jpg, .jpeg, .png" />
        </div>

        <Button  className='text-blue-600 w-[20%] mt-5 mx-auto' type='submit' variant="outline">Submit</Button>
      </form>
    </div>
  );
};

export default UserDetails;
