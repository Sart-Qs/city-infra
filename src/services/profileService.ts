import axios from "axios";
import type { IProfileUserData } from "../model/profileUserData";
import type { IJwtResponse } from "../model/jwtResponse";
import { jwtDecode } from "jwt-decode";


const server = import.meta.env.VITE_API_HOST;
const token = localStorage.getItem("token");


export async function getProfileUserData(){
    if(token !== null){
        const userId: IJwtResponse = jwtDecode(token);
        const respons = axios.get<IProfileUserData>(`${server}api/profile/${userId.id}`,
            {
                headers: {
                     'Authorization': `Bearer ${token}`
                }
            }
        ).then((response) =>{
            return response.data;
        })
        
        return respons;
    }

}