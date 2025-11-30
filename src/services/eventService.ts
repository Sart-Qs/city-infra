import axios from "axios";
import type { IEventResponse } from "../model/eventResponse";
import type { IEventRequest } from "../model/eventRequest";

const server = import.meta.env.VITE_API_HOST;
const token = localStorage.getItem("token");


export async function getAllEvents(){
    if(token !== null){
        const response = axios.get<Array<IEventResponse>>(`${server}api/events/findAll`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
        })
        return (await response).data
    }
}

export async function saveEvents(event: IEventRequest, formData: FormData){
    if(token !== null){
        formData.append('event', new Blob([JSON.stringify(event)], {
            type: 'application/json'
        }));
        const response = axios.post<IEventRequest>(`${server}api/events/saveEvent`, formData, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
        })
        return response
    }
}


export async function findEventByUserId(userId: number){
    if(token !== null){
        const response = axios.get<IEventResponse>(`${server}api/events/${userId}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
        })
        return response
    }
}
