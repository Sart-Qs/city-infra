export interface IEventResponse{
    id: number,
    coordinates: Array<number>,
    userId: number,
    description: string,
    files: Array<string>,
    timestomp: Date
}