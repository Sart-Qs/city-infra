import type React from "react"
//TODO Добавить обработчик времени
interface IChatMessage{
    content: string,
    time: Date,
    isMy: boolean
}

//TODO Добавить обработчик медиафайлов
export const ChatMessage: React.FC<IChatMessage> = ({
    content,
    time,
    isMy
}) => {
    return(
        <div className={`flex ${isMy ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isMy? "bg-blue-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm"}`}>
                <p className="text-sm">{content}</p>
                <p className={`text-xs mt-1 ${isMy ? "text-blue-100" : "text-gray-500"}`}>
                    {time.toString()}
                </p>
            </div>
        </div>

)}