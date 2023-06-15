"use client"
import Footer from "@/components/client/footer/Footer";
import Navbar from "@/components/client/navbar/navbar";
import { useSession } from "next-auth/react";
export default function Layout ({authedLanding,landing}:{authedLanding:React.ReactNode,landing:React.ReactNode}) { 
    const ss = useSession()
    if(ss.status==="loading") return <div className="loading animate-pulse h-screen w-screen"></div>
    
    return (
        <div>
            <Navbar/>
            {ss.status==="unauthenticated" 
            ? landing
            : authedLanding
            }
            <Footer/>
        </div>
        )
}