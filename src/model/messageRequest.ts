export interface IMessageRequest{
    senderId: number,
    recipientId: number,
    chatId?: string,
    content: string,
}