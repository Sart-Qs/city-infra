import type React from "react";

interface IButton{
    name: string,
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
}


const Button: React.FC<IButton> = ({
    name,
    onClick,
}) => {

    return (
        <button className="outline-0 bg-blue-500 text-gray-50 rounded w-full h-10 font-bold hover:bg-blue-400 cursor-pointer"onClick={onClick}>
            {name}
        </button>
    );
}

export default Button;