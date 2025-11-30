import type React from "react";

interface IDot {
    onClick?: (e: React.MouseEvent) => void;
    svg?: string;
}

const Dot: React.FC<IDot> = ({
    onClick,
    svg
}) => {

    return(
        <div className="rounded-3xl bg-white h-10 w-10 z-10 shadow-sm flex justify-center" onClick={onClick}>
            <div className="self-center text-center">
                <img src={svg}/>
            </div>
        </div>
    )
}

export default Dot;