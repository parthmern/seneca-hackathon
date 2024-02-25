import React from 'react';
import { Badge } from "../components/ui/badge"
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

  
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../components/ui/carousel" ;

const Slider = ({user}) => {

    const name = user?.name ;
    const profileImg = user?.profileImg ;
    const interst = user?.interest ;
    const gender = user?.gender === 'male' ;
    //console.log("interst=>", interst);
    const bio = user?.bio ;

  return (
    <CarouselItem className='text-white flex flex-col gap-y-3 items-center justify-center'>
        <div className='text-xl uppercase flex items-center justify-center gap-x-5'>  
            <p>{name}</p>
            <p className={`h-[20px] flex items-center justify-center w-[20px] rounded-md p-3 ${user?.gender === 'male' ? 'bg-blue-700' : 'bg-pink-500'}`}>{user?.gender === 'male' ? <FaMale className='absolute'/> : <FaFemale className='absolute' />}</p>
        </div>
        

        
        <div>
            {
                profileImg &&
                <div className='w-[50%] mx-auto rounded'>
                    <img className='rounded' src={profileImg}></img>
                </div>
            }
        </div>

        <div>
            {
                interst && (
                    <>
                    {
                        interst.map((int)=>{
                            return(
                                <Badge className={'text-black bg-white ml-2'} variant="outline">{int}</Badge>
                            )
                        })
                    }
                    </>
                )
            }
        </div>
        
        <div>
            {
                bio && 
                (
                    <Badge className={'text-black bg-[#2CDDDD] ml-2 hover:bg-[#2CDDDD]'}>{`BIO = ${bio}`}</Badge>
                )
            }
        </div>

    </CarouselItem>
  )
}


export default Slider ;