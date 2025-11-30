export interface IChatRoomResponse{
  id: number;
  chatId: string;
  chatName: string;
  lastMessage: string;
  unReadMessages: number;
  senderId: number;
  recipientId: number;
  avatar: string
}