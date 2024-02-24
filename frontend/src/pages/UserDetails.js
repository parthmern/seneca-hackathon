import React, { useState } from 'react';
import axios from 'axios';
import { Databases } from 'appwrite';
import { client, database } from '../appwriteConfig/config';
import { UserDetailsId, dbId } from '../utils/environmentVars';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/input';


const UserDetails = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState([]);
  const [smoking, setSmoking] = useState(false);



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
    console.log({ name, gender, interests, smoking });

    try {

      const toastId = toast.loading("Loading...")
        const response = await database.createDocument(dbId, UserDetailsId, "unique()",{
            name,
            gender,
            interest : interests,
            smoking
        });
        
        console.log('Record updated successfully:', response);
        toast.success("userdetails updated");

        const res = await database.listDocuments('65d93215af46d0861583', '65d932540eace0dc8ca1');
        console.log(res);
        toast.dismiss(toastId);

      } catch (error) {
        console.error('Error updating record:', error);
        toast.error("user details not updated");
      }
  };

  return (
    <div>
      <h2>User Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          
          <Input required type="text" value={name} onChange={(e) => setName(e.target.value)} />

        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>Interests:</label>
        <br />
        <label>
          Cooking
          <input
            type="checkbox"
            value="cooking"
            checked={interests.includes('cooking')}
            onChange={handleInterestChange}
          />
        </label>
        <label>
          Music
          <input
            type="checkbox"
            value="music"
            checked={interests.includes('music')}
            onChange={handleInterestChange}
          />
        </label>
        <label>
          Movie
          <input
            type="checkbox"
            value="movie"
            checked={interests.includes('movie')}
            onChange={handleInterestChange}
          />
        </label>
        <label>
          Cricket
          <input
            type="checkbox"
            value="cricket"
            checked={interests.includes('cricket')}
            onChange={handleInterestChange}
          />
        </label>
        <label>
          Tennis
          <input
            type="checkbox"
            value="tennis"
            checked={interests.includes('tennis')}
            onChange={handleInterestChange}
          />
        </label>
        <br />
        <label>
          Smoking:
          <input type="checkbox" checked={smoking} onChange={(e) => setSmoking(e.target.checked)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserDetails;
