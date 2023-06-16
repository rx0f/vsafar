"use client" 
import ClientContainter from "../Container";
import logo from "@/assets/V-safar 1.png"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar (){
    
    return (
        <>
        <ClientContainter LayoutBackground='untilMd:sticky untilMd:top-0 z-40 lg:fixed w-full lg:z-10 bg-sky' Custumize=' ' >
            <Navigator/>
        </ClientContainter>
        <ClientContainter LayoutBackground='hidden lg:block fixed w-full z-40' Custumize=' ' >
            <Navigator/>
        </ClientContainter>
        </>
    )
}

function Navigator () {
    const ss = useSession() as any
    const router = useRouter()
    
    return (
        <div className="navbar p-3 h-20 z-40 text-white  font-semibold select-none">

            <div className="navbar-start">
                <img src={logo.src} className="cursor-pointer h-10 lg:h-14" alt='logo' onClick={()=>router.push("/")}/>
            </div>

            {
                ss.status == "loading"
                ?  <></>
                :
                ss.status=="unauthenticated" 
                ? 
                <div className="navbar-end">
                    <Link href={"/auth/login"} className=" cursor-pointer text-lg lg:text-xl ml-2  hover:text-blue-500 transition duration-200">Authentification</Link>
                </div>
                :
                
                <div className="navbar-end " onClick={()=>router.push("/")}>
                    <div className="dropdown dropdown-end">
                    <label tabIndex={0} >
                    <div className="avatar placeholder cursor-pointe r" >
                        <div className="bg-blue-500 text-neutral-content rounded-full w-14">
                            <span className="text-xl">{ss.data?.user?.data?.nom.charAt(0)}{ss.data?.user?.data?.prenom.charAt(0)}</span>
                        </div>
                    </div>
                    <div className=" cursor-pointer hover:text-blue-500 text-xl ml-2 hidden lg:inline">{ss.data?.user?.data?.nom} {ss.data?.user?.data?.prenom}</div>
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <button className="text-sky" onClick={()=>{signOut()}}>déconnexion</button>
                    </ul>
                    </div>
                </div>

            }
            
        
        </div>
    )
}