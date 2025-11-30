import axios from "axios";
import type { IChatRoomResponse } from "../model/chatRoom";
import type { IJwtResponse } from "../model/jwtResponse";
import { jwtDecode } from "jwt-decode";
import type { IFindUserResponse } from "../model/findUserResponse";

const server = import.meta.env.VITE_API_HOST;
const token = localStorage.getItem("token");

export async function getAllChatRooms(){
    if(token !== null){
        const userId: IJwtResponse = jwtDecode(token);
        const respons = axios.get<Array<IChatRoomResponse>>(`${server}api/chats/getChats/${userId.id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return (await respons).data;
    }

}

export async function findUserByUserName(userName: string){
    if(token !== null){
        const respons = axios.get<IFindUserResponse>(`${server}api/getUserByUserName/${userName}`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return (await respons).data;
    }
}