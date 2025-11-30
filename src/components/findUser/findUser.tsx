interface IFindUser{
    firstName: string,
    lastName: string,
    avatar: string,
    onClick: (e: React.MouseEvent) => void,
}

export const  FindUser: React.FC<IFindUser> = ({
    firstName,
    lastName,
    avatar,
    onClick,
}) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors" onClick={onClick}>
      <div className="relative">
        {/*Изображение чата*/}
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {avatar}
        </div>
        {/*Статус(Онлайн или Офлайн)*/}
        {/*{ && (<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>)}*/}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
        {/*Имя пользователя*/}
        <h3 className="font-semibold text-gray-800 truncate">
            {`${firstName} ${lastName}`}
        </h3>
        </div>
      </div>
    </div>
  );
}