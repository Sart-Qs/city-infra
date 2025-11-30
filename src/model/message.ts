export interface IMessageResponse{
    id: number,
    chatId: string,
    senderId: number,
    recipientId: number,
    content: string,
    timeStamp: Date
}