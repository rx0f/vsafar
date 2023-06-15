"use client"
import React, { useEffect, useRef } from 'react';
import algeria from "@/assets/sahara-algerie.png"
import Link from 'next/link';
function PresentationCover() {
    const ImageRef = useRef<any>(0);
    const TextRef = useRef<any>(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        ImageRef.current.style.opacity = Math.min(1,1- (position / 400))
        TextRef.current.style.opacity = Math.min(1,1- (position / 400))
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        const position = window.pageYOffset;
        ImageRef.current.style.opacity = Math.min(1,1- (position / 500))
        TextRef.current.style.opacity = Math.min(1,1- (position / 500))
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className=" relative z-20">
        <figure className='bg-sky '><img ref={ImageRef} src={algeria.src} className="w-full h-full min-h-[360px] max-h-[100vh] opacity-100 brightness-75 transition-opacity duration-300 ease-out" /></figure>
        <div ref={TextRef} className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-100 w-full px-4">
            <h1 className='font-extrabold text-xl md:text-4xl xl:text-[70px] mb-8'> Vsafar </h1>
            <p className='hidden md:block lg:mt-2 md:mt-10 text-sm lg:text-xl font-semibold'>
            La solution est une plateforme interactive pour les touristes avec une carte numérique touristique, des visites virtuelles de lieux touristiques et des fonctionnalités de recherche et de commentaires. Les employés du ministère et les responsables des lieux touristiques...
            </p>
            <p className=' md:hidden   font-semibold'>
            La solution est une plateforme interactive pour les touristes avec une carte numérique touristique, des visites virtuelles de lieux touristiques et des fonctionnalités de recherche et de commentaires. 
            </p>
            <Link href={'/auth/login'} className='hidden md:block mt-7 mx-auto bg-night hover:bg-white text-white hover:text-sky text-xl font-semibold border-white border-1 transition duration-300 ease-out p-3 rounded-xl w-36'>Authentifier</Link>
        </div>
        </div>
    );
}

export default PresentationCover;

