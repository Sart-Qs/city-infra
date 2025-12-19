import { useCallback, useEffect, useState } from "react";
import { ChatRoom } from "../../components/chatRoom/chtaRoom";
import type {IChatRoomResponse } from "../../model/chatRoom";
import { findUserByUserName, getAllChatRooms } from "../../services/chatRomService";
import { ChatHeader } from "../../components/chatHeader/chatHeader";
import { getAllCahtMessages, sendMessage, setMessageCallBack, setStatusCallBack, WebSocketConnect } from "../../services/messagesService";
import type { IMessageResponse } from "../../model/message";
import { ChatMessage } from "../../components/chatMessage/chatMessage";
import type { IJwtResponse } from "../../model/jwtResponse";
import { jwtDecode } from "jwt-decode";
import type { IFindUserResponse } from "../../model/findUserResponse";
import { FindUser } from "../../components/findUser/findUser";
import type { IMessageRequest } from "../../model/messageRequest";
import { ArrowLeft, Paperclip, Plus, Send } from "lucide-react";

const token = localStorage.getItem("token");
    const getUserId = (): IJwtResponse | undefined => {
        if (token !== null) {
            try {
                const tok: IJwtResponse = jwtDecode(token);
                return tok;
            } catch (error) {
                console.error("Ошибка декодирования токена:", error);
                return undefined;
            }
        }
        return undefined;
    };

function ChatPage() {
    let findUserName: string | null;
    const [message, setMessage] = useState<IMessageRequest>();
    const [selectedChat, setSelectedChat] = useState<IChatRoomResponse>();
    const [chatMessages, setChatMessages] = useState<Array<IMessageResponse>>();
    const [chats, setChats] = useState<Array<IChatRoomResponse>>();
    const [userFinds, setFindUsers] = useState<IFindUserResponse>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = getUserId();

     useEffect(() => {
        setMessageCallBack((newMessage: IMessageResponse) => {
            if (selectedChat && selectedChat.id == newMessage.id) {
                setChatMessages(prev => prev ? [...prev, newMessage] : [newMessage]);
            }
        });
        setStatusCallBack((user: {status: string, id: number}) =>{
            console.log("userOnline " + user);
        })
        return () => {
            setMessageCallBack(null);
            setStatusCallBack(null);
        };
    }, [selectedChat]);


    useEffect(() =>{
        if(token !== null){
            WebSocketConnect();
        }
        getAllChatRooms().then(
            (response) => {
                setChats(response);
            }
        )
    }, []);

    function selectChat(chat: IChatRoomResponse){
        setSelectedChat(chat);
        getAllCahtMessages(chat.id).then((response) =>{
            if (response)
            setChatMessages(response);
        });
        
    }

    const handleBackClick = useCallback(() => {
        window.history.back();
    }, []);

    const handlePlusClick = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    //TODO Добавть обработчик нажатия для добавления чата
    //TODO Поменять ! 
    function selectFindUser(){
        setSelectedChat({
            id: 0,
            avatar: userFinds!.avatar,
            chatName: userFinds!.firstName,
            lastMessage: "",
            unReadMessages: 0
        })
        closeModal();
    }

    function send(){
        if(selectedChat){
            setMessage(
                {
                    content: content,
                    chatId: selectedChat.id || undefined,
                    userId: user?.id || 0,
                }
            )
            console.log(message)
            if(message != undefined && message?.content != undefined){
                const newMessage: IMessageResponse = 
                    {id: 0,
                    chatId: selectedChat.id,
                    userId: user?.id || 0,
                    content: message.content,
                    timeStamp: new Date(),
                    }
                setChatMessages(prev => prev ? [...prev, newMessage] : [newMessage])
                sendMessage(message);
            }
        }
    }

    function findUser(){
        if(findUserName != null){
            findUserByUserName(findUserName).then((response) =>{
                setFindUsers(response)
            })
        }
        
    }


    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-1 h-screen">
                {/* Боковая панель с чатами */}
                <div className="bg-white w-80 border-r border-gray-200 flex flex-col">
                    {/* Заголовок и поиск */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            {/* Кнопка Назад */}
                            <button
                                onClick={handleBackClick}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2" // Добавлен mr-2 для отступа
                            >
                                <ArrowLeft/>
                            </button>
                            <h1 className="text-xl font-bold text-gray-800">Сообщения</h1>
                            <button
                                onClick={handlePlusClick}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <Plus/>
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Поиск чатов..."
                            />
                            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Список чатов */}
                    <div className="flex-1 overflow-y-auto">
                        {chats?.map((e) => {
                            return <ChatRoom key={e.id} id={e.id} chatId={e.id} chatName={e.chatName} lastMessage={e.lastMessage} unReadMessages={e.unReadMessages} onClick={() => { selectChat(e) }} />;
                        })}
                    </div>
                </div>

                {/* Основная область чата */}
                <div className="flex-1 flex flex-col h-screen">
                    {/* Заголовок чата */}
                    {selectedChat != null && (
                        <ChatHeader avatar={selectedChat.avatar} chatName={selectedChat.chatName} status={selectedChat.chatName} />
                    )}
                    {/* Область сообщений */}
                    <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                        <div className="space-y-4">
                            {chatMessages?.map((e) => {
                                return <ChatMessage key={e.id} content={e.content} isMy={user?.id == e.userId ? true : false} time={new Date(e.timeStamp)} />;
                            })}
                        </div>
                    </div>

                    {/* Панель ввода сообщения */}
                    <div className="bg-white border-t border-gray-200 p-4">
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Paperclip/>
                            </button>
                            <div className="flex-1">
                                <input
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Напишите сообщение..."
                                    onChange={(e) => {setMessage((prev) =>{
                                        return {
                                            ...prev,
                                            content: e.target.value
                                        }
                                    })}}
                                />
                            </div>
                            <button className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
                                    onClick={send}>
                                <Send color="white"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Создать новый чат</h2> 
                        <input
                            type="text"
                            onChange={(e) => {findUserName = e.target.value}}
                            placeholder="Введите имя"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <div className="flex justify-end space-x-3"> {/* Кнопки в модальном окне */}
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Отмена
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={findUser}>
                                Отправить
                            </button>
                        </div>
                        { userFinds != null && (
                            <FindUser avatar={userFinds.avatar} firstName={userFinds.firstName} lastName={userFinds.lastName} key={userFinds.id} onClick={() => {selectFindUser()}}/>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatPage;