"use client"

import LogoFooter from '@/assets/V-safar 1.png'
import GoUpIcon from '@/assets/GoUpIcon.svg'
import ClientContainter from '../Container';
import ContactFooter from './Contact';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
function Footer() {
    // const nav = useNavigate()
    // const [user,setUser] = useElbayt()
    const pathname = usePathname();

  
    if (pathname === "/auth") return <></>

    return (
        <>
        <ClientContainter LayoutBackground='z-0' Custumize='py-6 text-center'>
            <ContactFooter/>
            </ClientContainter>
        <ClientContainter LayoutBackground='bg-sky' Custumize='' >

            <footer className='pt-10 pb-28 relative  '>
                <div className='md:grid grid-cols-3 md:items-center untilMd:text-center untilMd:space-y-10'>
                    <img src={LogoFooter.src} alt='footer logo' className='untilMd:mx-auto'/>
                    <div className='mx-auto grid grid-cols-1 font-extrabold text-lg text-white space-y-5 mt-12 sm:mt-0'>
                        <Link href={"/"} >Facebook</Link>
                        <Link href={"/"} >Twitter </Link>
                        <Link href={"/"} >Instegram</Link>
                    </div>
                    <div className='mx-auto grid grid-cols-1 font-extrabold text-lg text-white space-y-5 mt-12 sm:mt-0'>
                        <Link href={"/"} >Qui somme nous ?</Link>
                        <Link href={"/"} >Contactez nous </Link>
                        <Link href={"/"} >Conditions d'utilisation</Link>
                    </div>
                </div>
                <img onClick={()=>{window.scrollTo({top:0 , behavior: 'smooth'})}} src={GoUpIcon.src} className='cursor-pointer absolute  right-2 bottom-8'/>
            </footer>
        </ClientContainter>
        <ClientContainter LayoutBackground='' >
            <footer className='text-center font-bold text-lg p-4' onClick={()=>{}}>
                © 2023 VSAFAR. Tous droits réservés.  Le site touristique de l'Algérie
            </footer>
        </ClientContainter>
        </>
    );
}

export default Footer;