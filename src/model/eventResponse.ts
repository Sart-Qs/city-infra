import type { IUser } from "./user";

export interface IEventResponse{
    id: number,
    coordinates: Array<number>,
    user: IUser,
    description: string,
    fileUrl: string[],
    timestomp: Date
}