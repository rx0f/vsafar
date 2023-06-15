import ClientContainter from "@/components/client/Container";
import PresentationCover from "./presentation_cover";

export default function Landing () {
    return (
        <ClientContainter LayoutBackground='z-10' CustumizeOverRide='w-full'>
            <PresentationCover/>
        </ClientContainter>
    )
}