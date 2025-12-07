export interface IEventResponse{
    id: number,
    coordinates: Array<number>,
    userId: number,
    description: string,
    filesUrl: Array<string>,
    timestomp: Date
}