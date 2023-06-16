"use client"
import ClientContainter from "@/components/client/Container";
import logo from "@/assets/V-safar 1.png"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import img1 from '@/assets/snow.png';

export default function Layout ({children}:{children:React.ReactNode}) { 
    
    const router = useRouter()
    const ss = useSession();
    if(ss.status==="loading") return <></>
    
    if (ss.status == "authenticated" ) return router.push("/")
    
    return (
        <div>
            <ClientContainter LayoutBackground='hidden md:block fixed w-full z-40' Custumize=' ' >
            <div className="navbar p-3 h-20 z-40 text-white  font-semibold">
                <div className="navbar-start">
                    <img src={logo.src} className="h-10 md:h-14" alt='logo'/>
                </div>
            </div>
            </ClientContainter>
            
            <div className="relative z-10">
                <figure className="bg-sky" onClick={() => {}}>
                    <img src={img1.src} className="w-full h-[70vh] brightness-50" />
                </figure>
                
                {children}
                
            </div>
            
        </div>
        )
}


