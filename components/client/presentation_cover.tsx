"use client"
import React, { useEffect, useRef, useState } from 'react';
import Underline from '@/assets/Underline.svg'
import ImageWrapper from './Imagewrapper';
import { useVsafar } from '@/app/(client)/@authedLanding/VsafarContext';
import { extractCategories, extractThemes } from '@/app/(client)/@authedLanding/cardsConext';
function PresentationCover() {
    const ImageRef = useRef<any>(0);
    const TextRef = useRef<any>(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        if (ImageRef.current?.style) ImageRef.current.style.opacity = Math.min(1,1- (position / 600))
        if (TextRef.current?.style) TextRef.current.style.opacity = Math.min(1,1- (position / 600))
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className=" relative z-20">
        <ImageWrapper imageRef={ImageRef}/>
        <div ref={TextRef} className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-100 ">
            <h1 className='font-extrabold text-base md:text-4xl xl:text-[55px]'> <UnerLiner/></h1>
            <p className='mt-2 md:mt-10 font-semibold'>
            Bienvenue sur Vsafar, votre guide de voyage ultime pour découvrir l&apos;Algérie ! 
            <span  className='hidden md:block'>Explorez les trésors naturels, culturels et historiques de ce pays fascinant, 
            planifiez votre itinéraire avec nos conseils avisés et préparez-vous à vivre des expériences inoubliables. 
            Vsafar vous accompagne dans votre aventure touristique en Algérie.
            </span>
            </p>
            <div className='w-full text-xl mt-7 font-bold'>Rechercher un Lieu </div>
            <div className='md:flex md:gap-3'>
                <Selection head="categorie" />
                <Selection head="theme"  />
                
            </div>
        </div> 
        </div>
    );
}

export default PresentationCover;


function UnerLiner () {
    return (
        <span>
        <div className='relative inline'>Vsafar !
        <img src={Underline.src} className ='absolute  -bottom-1 left-1/2 -translate-x-1/2 inline'/>
        </div>
        </span>
    )
}



function Selection({head} : {head:string}) {
   const [options,setOptions] = useState<any>([])
   const Vsafar = useVsafar()
   const [cards,,,,,setSelector] = Vsafar
   useEffect(()=>{
    if (head == "categorie") setOptions(extractCategories(cards))
    if (head == "theme") setOptions(extractThemes(cards))
    
   },[cards])
    const handleChange=(e:any)=>{
        setSelector((current:any)=>{
            const update = {...current}
            if (head=="categorie") update.categorie = e.target.value
            else if  (head=="theme") update.theme = e.target.value
            return update
        })
    }
    return (
        <div className='w-full mt-2'>
        <select className="select select-bordered w-full text-xl text-sky" onChange={handleChange}>
            <option key={0} value={head} >{head}</option>
            {options.length && options.map((option:any,i:any)=><option value={option} key={i+1}>{option}</option>)}         
        </select>
        </div>
    )
}