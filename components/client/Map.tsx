"use client" 
import React, {  useState } from 'react'
import { GoogleMap, useLoadScript , Marker} from '@react-google-maps/api'
import safar from "@/assets/Group 80.png"
import img from "@/assets/V-safar 1.png"
import Modal from './Modal'
import Link from 'next/link'
import { useVsafar } from '@/app/(client)/@authedLanding/VsafarContext'





export default function MyComponent() {
  
  const [toggleModel,setToggleModel] = useState<any>(false);
  const [,,cardsByselector] = useVsafar()

 


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqYRhL7748Xa6Z6EntSId3p5NEh9htw5s" // ,
  })

  const renderMap = () => {
    return (
      
      <>
    <MapModal state={toggleModel} setState={setToggleModel}/>
    {
    // @ts-ignore 
    <GoogleMap
    mapContainerStyle={{ height: '100%', width: '100%' ,  display: 'block' }}
    options={{
      zoom:5,
      center: {lat:36.752887 , lng:3.042048 },
      backgroundColor: "#000",
    }}
    >   
   
    {
      !cardsByselector.length ? <></>
      :
      <>
      {cardsByselector.map((card:any,index:any)=>{
        const labelMaker = {
          text: card.nom||'', 
          color: '#fff', 
          fontSize: '28px', 
          fontWeight: 'extrabold', 
          className: ''

        }
        let [lat,lng] = card.localisation.split(',')
        lat = parseInt(lat)
        lng = parseInt(lng)
        if (isNaN(lat)||isNaN(lng)) return <></>
        // @ts-ignore
        return <Marker key={index} position={{lat, lng}} onClick={()=>{setToggleModel(card)}}  label={labelMaker} icon={{url:safar.src,scaledSize:new google.maps.Size(60,60)}}/>
      })}
      {cardsByselector.map((card:any,index:any)=>{
        return (
          <>
          {
            !card?.actualites?.length ? <></>
            :card.actualites.map((act:any)=>{
              let [lat,lng] = act.centre_circle?.split(',') || [NaN,NaN]
              lat = parseInt(lat)
              lng = parseInt(lng)
              if (isNaN(lat)||isNaN(lng)) return <></>
              // @ts-ignore
              return <Marker key={index} position={{lat, lng}}  icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: "#1f1f",
                fillOpacity: 0.4,
                strokeWeight: 0.
              }}/>
            })
          }
          </>
        )
      
      })}
      </>
    }
    </GoogleMap>
  }
    </>)
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <></>
}



function MapModal ({state,setState}:{state:any,setState:any}) {
  if (!state) return <></>
  return (
  <Modal  setState={setState} >
   <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img className='rounded-xl mt-4 lg:mt-0 ml-2 max-w-[250px]' src={state?.medias[0]?.media_lien||img.src} alt=""/></figure>
  <div className="card-body ">
    <h2 className="card-title">{state.nom}</h2>
    <div className=' overflow-auto max-w-[400px] max-h-[300px]'><p className=''>{state.description}</p></div>
    
    <div className="card-actions justify-end">
    <Link href={`/destination/${state.id}`} className="btn btn-primary">Visite</Link>
    </div>
  </div>
</div>
  </Modal>
  )
}
