'use client'
import ClientContainter from "@/components/client/Container";
import clock from "@/assets/clock.svg"
import mapicon from "@/assets/mapicon.svg"
import {  useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { VsafarProvider, useVsafar } from "../../VsafarContext";
export default function DestinationWrapper () {
    return (<VsafarProvider><Destination/></VsafarProvider>)
}
function Destination () {
    const {id} = useParams()
    const [destination , setDestination] = useState<any>("loading");
    const [cards] = useVsafar()
    useEffect(()=>{
        const getDestination = async () => {
            if (cards?.length){
            let k =  cards.filter((d:any)=>d.id==id)[0] || undefined
            setDestination( k )
            }
        }
        getDestination()
    },[cards])
    if (destination =="loading" || destination == undefined) return <>loading...</>
    return (
        
        <ClientContainter LayoutBackground='z-10 ' >
            <div className="sm:grid grid-cols-2 w-full mt-28 p-12 bg-slate-200 space-y-4 ">
        
                <div className='sm:p-5 order-2 sm:order-1'><DataShow info={destination}/></div>
                <div className='sm:p-5 order-1 sm:order-2'><ImageShow imageData={destination} /></div>
            </div>
        </ClientContainter>
    )
}

interface IImageType {
    imageData:any
}
function ImageShow ({imageData}:IImageType) {
    
    return (
        <>
        <div className="carousel w-full">
        {imageData.medias.map((image:any, index:any) => (
            <div id={`item${index + 1}`} key={`item${index + 1}`}   className="carousel-item w-full">
            <img src={image.media_lien} className="w-full rounded-xl max-h-80" />
            </div>
        ))}
        </div>
        <div className=" hidden sm:flex justify-end w-full py-2 gap-2 overflow-x-auto scrollbar-thumb-sky scrollbar-track-white">
        {imageData.medias.map((image:any, index:any) => (
            <a key={index} href={`#item${index + 1}`} className="">
                <img src={image.media_lien} className="h-14" />
            </a>
        ))}
        </div>
        </>
    )
}

function DataShow (props:any) {
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        var feedback = e.currentTarget.feedback.value;
        let sub = await axios.post(process.env.NEXT_PUBLIC_BASE_URL+"/api/utilisateur/site/"+props?.info?.id,{contenu:feedback} ).catch(e=>console.log(e))
        document.getElementById("feedback")?.setAttribute("value",'')
    }

    return (
        <div className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-sky scrollbar-track-white max-h-[428px] scroll-m-3">
        <h1 className="font-bold text-2xl">{props?.info?.nom }</h1>
        <p>{props?.info?.description}</p>
        <h1 className="font-bold inline">Moyennes de transportation</h1>
        <p className="inline ml-1">{props?.info?.moyennes_transport}</p>
        <h1 className="font-bold ">Actualites</h1>
        {
            !props?.info?.actualites?.length? <></>
            :props.info.actualites.map ((act:any,index:any)=><CollapseNews key={index} headline={act.nom} date={act.date} description={act.description} type={act.type} />)
              
        }
        {
            props?.info?.documentation_historique &&(
            <div>
            <h1 className="font-bold inline">Documentation historique</h1>
            <p className="inline ml-1">{props?.info?.documentation_historique}</p>
            </div>)
        }
        <h1 className="font-bold ">Plus d&apos;information</h1>
        <div className="space-x-4">
            <img src={clock.src} className="w-8 inline" alt="" />
            <span>Ouvre:  {props?.info?.debute_access}</span>
            <span>Ferme:  {props?.info?.fin_access}</span>
        </div>
        <div className="space-x-4">
            <img src={mapicon.src} className="w-8 inline" alt="" />
            <span>{props?.info?.commune}</span>
        </div>
        
        {props?.info?.theme?.nom&&<div className="badge badge-success badge-outline m-1">{props?.info?.theme?.nom}</div>}
        {props?.info?.categorie?.nom&&<div className="badge badge-secondary badge-outline m-1">{props?.info?.categorie?.nom}</div>}

        <form onSubmit={handleSubmit}>
        <textarea placeholder="Laissez nous un feed_back..." name="feedback" id="feedback" className="textarea textarea-bordered textarea-md w-full " ></textarea>
        <button className="btn w-full sm:btn-sm md:btn-md" type="submit">submit</button>

        </form>

        </div>
    )
}

{/* <CollapseNews headline={props?.info?.nom} date={props?.info?.actualites?.date} description={props?.info?.actualites?.description} type={props?.info?.actualites?.type} /> */}

function CollapseNews (props:any){
    return (
        <div key={props.index} tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">
            {props.headline}
        </div>
        <div className="collapse-content"> 
        <h1 className="font-bold">Type : {props.type}</h1>
        <h2 className="font-semibold">{(new Date(props.date)).toDateString()}</h2>
            <p>{props.description}</p>
        </div>
        </div>
    )
}