import { useEffect, useRef, useState } from "react";
import { YMapDefaultMarker, YMapFeature } from "../../lib/ymaps"
import { Heart } from "lucide-react";
import type { PolygonGeometry } from "@yandex/ymaps3-types";
import {circle} from "@turf/turf"
import type { IUser } from "../../model/user";
import { Comment } from "../comment/comment";

interface IMarker{
    coords: number[],
    images: string[],
    likes: number,
    user: IUser,
    description: string
}   

export const YMapMarkerPopUp: React.FC<IMarker> = ({
    coords,
    images,
    likes,
    user,
    description
}) =>{
    const [showBallonPopUp, setShowBallonPopUp] = useState<boolean>(false);
    const [like, setLikes] = useState<number>(likes);
    const [pressLike, setPressLike] = useState<boolean>(false);

    useEffect(()=>{
        console.log("🚀 ~ YMapMarkerPopUp ~ like:", like)

    },[like])
    //TODO сделать чтобы отправлялись данные при закрытии popUp`а

    const handleLike = async () => {
        setPressLike(!pressLike);
        if(!pressLike) {
            setLikes(prev => prev+1);
        }else if(pressLike){
            setLikes(prev => prev-1);
        }
    }

    const circleGemonetry = (center: number[]): PolygonGeometry =>{
        const {geometry} = circle(center, 100, {units: "meters"});
        return geometry as PolygonGeometry;
    }

    function showPopUp(){``
        return(
            <div className="w-3xs h-80 overflow-y-auto overflow-x-hidden">
                <div className="mb-0.5">
                    {images && (
                        images.map((e,i) =>{
                            console.log(e);
                            return <img className="w-full h-35" key={i} src={e}/>
                        })
                    )}
                </div>
                <div className="flex">
                    <div className="w-10 h-10 rounded-4xl bg-amber-600 min-w-10 min-h-10">

                    </div>
                    <div className="ml-0.5">
                        <div className="font-bold">
                            {`${user.firstName}  ${user.lastName}`}
                        </div>
                        <div className="break-all">
                            {description} 
                        </div>    
                    </div>
                    
                </div>
                <div className="ml-10 flex gap-0.5" onClick={handleLike}>
                    <button>
                        <Heart size={16} color="#D55A5A"/>
                    </button>
                    <div className="">
                        {like}
                    </div>
                </div>
                <div className="ml-10">
                    <Comment commentContent="Привет" likes={3} user={user} key={user.id}/>
                </div>
            </div>
        )
    }

    return(
        <>
            <YMapFeature geometry={circleGemonetry(coords)}
                style={{
                    fill: 'rgba(56, 56, 219, 0.0)',
                    stroke:[{
                        opacity: 1
                    }]
                }}
            />
            <YMapDefaultMarker onClick={() => {setShowBallonPopUp(!showBallonPopUp)}} coordinates={coords}
                popup={{
                    position: "top",
                    content: showPopUp,
                    show: showBallonPopUp
                }}
                size="micro"
            />
        </>

    )

}