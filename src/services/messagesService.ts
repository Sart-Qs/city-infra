import axios from "axios";
import type { IJwtResponse } from "../model/jwtResponse";
import { jwtDecode } from "jwt-decode";
import type {IMessageResponse} from "../model/message"
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client"
import type { IMessageRequest } from "../model/messageRequest";

const server = import.meta.env.VITE_API_HOST;
const token = localStorage.getItem("token");
console.log("🚀 ~ token:", token)
let stompClient: Client;

let onMessageReceived: ((message: IMessageResponse) => void) | null = null;
let onStatusRecived: ((user: {status: string, id: number}) => void) | null = null
export function setMessageCallBack(callback: ((message: IMessageResponse) => void) | null) {
    onMessageReceived = callback;
}

export function setStatusCallBack(callback: ((user: {status: string, id: number}) => void) | null){
    onStatusRecived = callback;
}

export async function getAllCahtMessages(chatId: number){
    if(token !== null){
        const userId: IJwtResponse = jwtDecode(token);
        const response = axios.get<Array<IMessageResponse>>(`${server}api/chats/messages/${chatId}`, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return (await response).data;
    }
}

export function WebSocketConnect(){
        if (!token) {
            console.error("No token found");
            return;
        }
        if (stompClient && stompClient.connected) {
            stompClient.deactivate();
        }
        try{
            stompClient = new Client({
                webSocketFactory: () => new SockJS(`${server}ws?token=${token}`),
                onConnect: onConnected,
                onStompError: onError
            });
            stompClient.activate();
        } catch(error){
            console.log(error);
        }

}

function onConnected(){
    if(token !== null){
        const userId: IJwtResponse = jwtDecode(token);

        if(!stompClient || !stompClient.connected){
            console.log("STOMP no connetion");
            return;
        }

        stompClient.subscribe(`/user/${userId.id}/queue/messages`,
            (message: IMessage) =>{
                const ms: IMessageResponse = JSON.parse(message.body);
                if(onMessageReceived){
                    onMessageReceived(ms);
                }
                return ms;
            }
        )

        stompClient.subscribe(`/user/topic/online`,
            (user: IMessage) =>{
                //TODO создать интерфейс
                const u: any = JSON.parse(user.body);
                if(onStatusRecived){
                    onStatusRecived(u);
                }
                return u;
            }
        )
    }
    
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(e: any){
    console.log(e);
}


export function sendMessage(message: IMessageRequest){
    stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(message)
    })
}
//TODO подумать может сделать поиск сообщений просто по id чата

//TODO добавить интерфейс
export function sendStatus(user: {status: string, id: number}){
    stompClient.publish({
        destination: '/app/status',
        body: JSON.stringify(user)
    })
}