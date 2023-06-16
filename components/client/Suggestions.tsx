"use client" ; 
import ClientContainter from "@/components/client/Container";
import img from "@/assets/algeria.jpg"
import {  useRef } from "react";
import Link from "next/link";
import { useVsafar } from "@/app/(client)/@authedLanding/VsafarContext";
export default function Suggestions () {
    
    const carousel = useRef<any>()
    const scrollToLeft = () => {carousel.current.scrollBy({left: -100,behavior: "smooth"})}
    const scrollToRight = () => {carousel.current.scrollBy({left: 100,behavior: "smooth"})}
    const [,,cardsByselector] = useVsafar()

    return (
        <ClientContainter LayoutBackground='bg-sky' Custumize='select-none'  >
          {
            !cardsByselector.length ? <div className='text-center text-5xl font-semibold text-white my-10'>Pas de destinations Prposées :( </div>
            :
            <>
          <div className='text-center text-5xl font-semibold text-white my-10'>Destinations Prposées </div>
          <div className='mx-auto flex'>
            <div className='hidden md:block w-1/12 h-full text-white font-bold my-auto mx-auto cursor-pointer hover:scale-125 transition duration-400 ' >
                <div  onClick={scrollToLeft}  className='bg-white text-sky rounded-full  w-10 align-middle text-center mr-auto  hover:bg-white hover:text-orange-500 transition duration-400'> ❮</div>
              </div>
                
                <div className='my-4 w-full md:w-10/12'>
                <div className="carousel rounded-box space-x-8  " ref={carousel} style={{ overflowX: 'scroll' }} >
                  <div className="carousel-item">
                    
                  </div> 
                {
                  cardsByselector.map((card:any)=>(
                    <>
                    <div className="carousel-item">
                    <Cardy 
                    id={card.id}
                    nom={card.nom||''}
                    description={card.description||''}
                    image={card?.medias[0]?.media_lien||img.src}
                    />
                    </div> 
                    </>
                  ))
                  
                }
                </div>
                </div>
              
            
              <div className='hidden md:block w-1/12 h-full text-white font-bold my-auto mx-auto cursor-pointer hover:scale-125 transition duration-400 ' >
                <div onClick={scrollToRight} className='bg-white text-sky rounded-full  w-10 align-middle text-center ml-auto  hover:bg-white hover:text-orange-500 transition duration-400'> ❯</div>
              </div>
          </div>
          </>
          }
        </ClientContainter>
    )
}



interface Icardy {
  id : any,
  nom : string ,
  description:string,
  image:string
}
function Cardy ({id,nom,description,image}:Icardy) {
    return (
      <Link href={`/destination/${id}`} className="card rounded-none rounded-tl-3xl  w-full max-w-[260px] sm:max-w-max  md:w-72  text-white cursor-pointer hover:scale-95 transition duration-300 ease-out">
        <figure  className="h-44 min-w-[260px] md:min-w-[288px]"><img src={image} alt="car!" className="h-44 min-w-[260px] md:min-w-[288px]"/></figure>
        <div className="card-body bg-black opacity-60 rounded-br-3xl ">
          <h2 className="card-title">{nom}</h2>
          <p className="h-40 max-h-40 overflow-y-auto  scrollbar-thin scrollbar-thumb-white scrollbar-track-sky">{description}</p>
        </div>
      </Link>
    )
  }