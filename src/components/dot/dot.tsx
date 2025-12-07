import type React from "react";
import { User, MessageCircle, MapPinPlusInside, Bell} from "lucide-react";

interface IDot {
    onClick?: (e: React.MouseEvent) => void;
    type: "mark" | "profile" | "notification" | "chat"
}

const Dot: React.FC<IDot> = ({
    onClick,
    type
}) => {

    return(
        <div className="rounded-3xl bg-white h-10 w-10 z-10 shadow-sm flex justify-center" onClick={onClick}>
            <div className="self-center text-center">
                { type === "mark" ? <MapPinPlusInside/> : null}
                { type === "profile" ? <User/> : null}
                { type === "chat" ? <MessageCircle/> : null}
                { type === "notification" ? <Bell/> : null}
            </div>
        </div>
    )
}

export default Dot;