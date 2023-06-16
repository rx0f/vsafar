import ClientContainter from '@/components/client/Container'
import PresentationCover from "../../../components/client/presentation_cover"

import Map from '@/components/client/Map'
import mapPlanes from "@/assets/mapPlanes.png"
import Suggestions from '../../../components/client/Suggestions'
import { VsafarProvider } from './VsafarContext'
export default function Home() {
  return (
    <div className= ''>
      <VsafarProvider>
        <ClientContainter LayoutBackground='z-10' CustumizeOverRide='w-full'>
                  <PresentationCover/>
          </ClientContainter>
          <ClientContainter LayoutBackground='z-10 bg-white min-h-[50px]' CustumizeOverRide='w-full'>
                  <img className='w-full' src={mapPlanes.src} alt='planes'/>
          </ClientContainter>
          <ClientContainter LayoutBackground='z-10' CustumizeOverRide='w-full'>
                    <div className= ' h-[500px] lg:h-[600px] w-full'><Map/></div>  
          </ClientContainter>
          <Suggestions/>
        </VsafarProvider>
    </div>
  )
}


