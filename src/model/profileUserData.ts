import type { IEventResponse } from "./eventResponse" 

export interface IProfileUserData{
    id: number,
    firstName: string,
    lastName: string,
    location: string,
    email: string,
    aboutSelf: string
    avatar: string
    events: IEventResponse[]
}

//TODO добавить мероприятия в интерфейс