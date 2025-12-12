import { Heart } from "lucide-react"
import type { IUser } from "../../model/user"
import { useState } from "react"

interface IComment{
    user: IUser,
    commentContent: string
    likes: number
}

export const Comment: React.FC<IComment> = ({
    user,
    commentContent,
    likes
}) =>{
    const [pressLike, setPressLike] = useState<boolean>(false);
        const [like, setLikes] = useState<number>(likes);

    const handleLike = async () => {
        setPressLike(!pressLike);
        if(!pressLike) {
            setLikes(prev => prev+1);
        }else if(pressLike){
            setLikes(prev => prev-1);
        }
    }

    return(
        <>
            <div className="flex">
                <div className="w-10 h-10 rounded-4xl bg-amber-600 min-w-10 min-h-10">
                    </div>
                        <div className="ml-0.5">
                            <div className="font-bold">
                                {`${user.firstName}  ${user.lastName}`}
                            </div>
                            <div className="break-all">
                                {commentContent} 
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
        </>
    )
}