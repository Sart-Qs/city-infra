interface IChatHeader{
    avatar: string,
    status: string,
    chatName: string,

}

export function ChatHeader(props: IChatHeader) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
        {/* Картинка чата */}
        <div className="flex items-center justify-between">
            <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                АИ
            </div>
            <div>
                {/* Имя чата */}
                <h2 className="font-semibold text-gray-800">{props.chatName}</h2>
                <p className="text-sm text-green-500 flex items-center">
                {/* Статус */}
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {props.status}
                </p>
            </div>
            </div>
            <div className="flex items-center space-x-4">
            {/* Поиск по чату */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                </svg>
            </button>
            {/* Опции чата */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
                </svg>
            </button>
            </div>
        </div>
    </div>

);}
