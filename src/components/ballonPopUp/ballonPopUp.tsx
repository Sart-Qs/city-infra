import { useEffect, useRef, useState } from "react";
import { YMapDefaultMarker } from "../../lib/ymaps"
import { Heart } from "lucide-react";

interface IMarker{
    coords: number[],
    images: string[],
    likes: number,
}   

export const YMapMarkerPopUp: React.FC<IMarker> = ({
    coords,
    images,
    likes,
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

    function showPopUp(){
        return(
            <div className="w-3xs h-80 overflow-y-auto overflow-x-hidden">
                <div className="mb-0.5">
                    {images && (
                        images.map((e,i) =>{
                            return <img className="w-full h-35" key={i} src={e}/>
                        })
                    )}
                </div>
                <div className="flex">
                    <div className="w-10 h-10 rounded-4xl bg-amber-600 min-w-10 min-h-10">

                    </div>
                    <div className="ml-0.5">
                        <div className="font-bold">
                            Имя Фамилия
                        </div>
                        <div className="break-all">
                            Описание 
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