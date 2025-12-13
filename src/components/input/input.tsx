import type React from "react";

interface IInput{
    name?: string,
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void,
    type: string
}


function Input(props: IInput){
    return (
    <div className="flex flex-col w-full mb-2.5">
        <label htmlFor={props.name}>{props.name}</label>
        <input type={props.type}
            name={props.name}
            className=" focus:outline-blue-500 focus:outline-2 rounded-sm outline-1"
            id = {props.name}
            onChange={props.onChange}/>
    </div>
)}

export default Input;