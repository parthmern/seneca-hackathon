import React, { useContext, useEffect, useState } from "react";
import { chatGptIntegration } from "../utils/chatGptIntegrate";
import { client, database } from "../appwriteConfig/config";
import Slider from "../componentsPageWise/Slider";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../components/ui/carousel" ;
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { UserDetailsId, dbId } from "../utils/environmentVars";

const ProfileMatchePage = () => {
    const [matchedUser, setMatchedUser] = useState();
    const [docs, setDocs] = useState();
    const [loading, setLoading] = useState(true);

    const {login, userDocId} = useContext(AppContext);

    useEffect(async () => {

        setLoading(true);
        var toastId = toast.loading("Finding Parthners")
        try {

            const res = await database.listDocuments(
                "65d93215af46d0861583",
                "65d932540eace0dc8ca1"
            );
            console.log(res.documents);

            setDocs(res.documents);

            const originalUser = await database.getDocument(dbId, UserDetailsId, userDocId);
            console.log("originaluserr====>",originalUser);

            const que = `${JSON.stringify(res.documents)} this is the DB

            for${JSON.stringify(
                originalUser
            )} this USER, find the matching users who can live together  without any conflicts and they have more chances to become good
            friends according to your experiance and common sense

            and then return the array of their $id make sure to return the array without any single word extra information

            make sure to give same answer for same question in future
            make sure that one userId once time

            `;

            console.log("queu", que);
            const ans = await chatGptIntegration({ que });
            console.log("ans in Matchuser", ans);
            console.log(typeof ans);
            setMatchedUser(JSON.parse(ans));
            toast.success("Matched successsfull")
        } catch (error) {
            console.log("error", error);
            toast.error("error in matching");
             
            toast.dismiss(toastId);
        }
        toast.dismiss(toastId);
        setLoading(false);
    }, []);

    console.log("matchedUser ==>", matchedUser);

    return (
        <div className=" w-[80vw] mx-auto">
            <div className="text-3xl border-b-[1px] border-yellow-300 text-white font-bold mt-8 mx-auto">Matched Users</div>

            {
                matchedUser ? (
                    <div className="mt-8">
                        <Carousel>
                            <CarouselContent>
                                {matchedUser && (
                                    <>
                                        {matchedUser.map((matchUserId) => {
                                            console.log("matchedUser under", matchedUser);

                                            function matchId(array, id) {
                                                // Filter the array to find objects with matching ID
                                                const matchedObjects = array.filter(
                                                    (obj) => obj.$id === id
                                                );
                                                return matchedObjects;
                                            }

                                            const matchedObjects = matchId(docs, matchUserId);

                                            console.log(matchedObjects);

                                            return (<Slider user={matchedObjects[0]} />);
                                        })}
                                    </>
                                )}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                ) : (
                    <div className="text-white"> 
                        {
                            loading ? "loading..." : (
                                <div className="text-pink-500 mt-8">
                                    Error while fetching
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ProfileMatchePage;
