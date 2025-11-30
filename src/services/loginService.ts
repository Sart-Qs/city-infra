import axios from "axios";
import type { IUser } from "../model/user";
import type { IJwtResponse } from "../model/jwtResponse";

const server = import.meta.env.VITE_API_HOST;

export async function registerUser(user: IUser){
    axios.post<IJwtResponse>(`${server}api/register`, user).then((response) => {
        console.log(response.data)
    })
    
}

export async function loginUser(user: IUser){ 
    try{
        const respons = await axios.post<{uer: IUser, token: string}>(`${server}api/login`, user);
        localStorage.setItem('token', respons.data.token);
        return respons.status === 200
    } catch(error){
        console.log(error);
        return false;
    }

}

