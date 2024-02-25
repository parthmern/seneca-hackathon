import React from 'react';

  
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
    const interst = user?.interst ;

  return (
    <CarouselItem className='text-white '>
        <div className='text-xl '> 
            {name}
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
                                <div className='text-white'>
                                    {int}
                                </div>
                            )
                        })
                    }
                    </>
                )
            }
        </div>

    </CarouselItem>
  )
}


export default Slider ;