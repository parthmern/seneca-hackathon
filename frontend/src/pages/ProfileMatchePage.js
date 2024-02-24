import React, { useEffect, useState } from 'react'
import { chatGptIntegration } from '../utils/chatGptIntegrate';
import { client, database } from '../appwriteConfig/config';

const ProfileMatchePage = () => {

    const [matchedUser, setMatchedUser] = useState();
    const [docs, setDocs] = useState();

    useEffect( async ()=>{

        try{
           
            const res = await database.listDocuments('65d93215af46d0861583', '65d932540eace0dc8ca1');
            console.log(res.documents);

            setDocs(res.documents);

            const que = `${JSON.stringify(res.documents)} this is the DB

            for${JSON.stringify(res.documents[0])} this USER, find the matching users who can live together  without any conflicts and they have more chances to become good
            friends according to your experiance and common sense

            and then return the array of their $id make sure to return the array without any single word extra information

            make sure to give same answer for same question in future

            `;

            console.log("queu", que);
            const ans = await chatGptIntegration({que});
            console.log("ans in Matchuser", ans);
            console.log(typeof(ans));
            setMatchedUser(JSON.parse(ans));
            
        }
        catch(error){

            console.log("error", error);

        }

    }, [])

    

    console.log("matchedUser ==>", matchedUser);

  return (
    <div className='text-white'>
        <div>
            matcchingg....
        </div>
        {
            matchedUser && 
            <div>
                {
                    
                    matchedUser.map((matchUserId)=>{

                        console.log("matchedUser under", matchedUser);

                        function matchId(array, id) {
                            // Filter the array to find objects with matching ID
                            const matchedObjects = array.filter(obj => obj.$id === id);
                            return matchedObjects;
                          }


                        const matchedObjects = matchId(docs, matchUserId);

                        console.log(matchedObjects);

                        return(
                            <div>
                                {matchedObjects[0].name}
                            </div>
                        )

                        

                    })
               }
            </div>
        }
    </div>
  )
}

export default ProfileMatchePage ;