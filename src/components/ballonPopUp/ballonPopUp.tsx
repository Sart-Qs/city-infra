import { useState } from "react";
import { YMapDefaultMarker } from "../../lib/ymaps"

interface IMarker{
    coords: number[],
    images: string[],

}   

export const YMapMarkerPopUp: React.FC<IMarker> = ({
    coords,
    images,
}) =>{
    const [showBallonPopUp, setShowBallonPopUp] = useState<boolean>(false);

    function showPopUp(){
        return(
            <div className="w-3xs h-80">
                {images && (
                    images.map((e,i) =>{
                        return <img className="w-full h-35" key={i} src={e}/>
                    })
                )}


            </div>
        )
    }

    return(
        <YMapDefaultMarker onClick={() => {setShowBallonPopUp(!showBallonPopUp)}} coordinates={coords}
            popup={{
                position: "top",
                content: showPopUp,
                show: showBallonPopUp
            }}
            size="micro"
            />
    )

}