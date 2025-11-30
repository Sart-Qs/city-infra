
interface IChatRoom{
    onClick?: (e: React.MouseEvent) => void;
    id?: number
    chatId?: string;
    chatName: string;
    lastMessage: string;
    unReadMessages: number;
    senderId?: number;
    recipientId?: number;
}

export const  ChatRoom: React.FC<IChatRoom> = ({
    onClick,
    chatName,
    lastMessage,
    unReadMessages
}) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors" onClick={onClick}>
      <div className="relative">
        {/*Изображение чата*/}
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {}
        </div>
        {/*Статус(Онлайн или Офлайн)*/}
        {/*{ && (<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>)}*/}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
        {/*Имя чата*/}
          <h3 className="font-semibold text-gray-800 truncate">
            {chatName}
            </h3>
        {/*Время последнего сообщения*/}
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {}
          </span>
        </div>
        <div className="flex justify-between items-center">
            {/*Последнее сообщение*/}
          <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
          {/*Количество непрочитанных сообщений*/}
          {unReadMessages > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
              {unReadMessages}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
