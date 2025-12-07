import { useEffect, useState } from "react";
import type { IProfileUserData } from "../../model/profileUserData";
import { getProfileUserData } from "../../services/profileService";
import { Event } from "../../components/event/event";
import { Mail, MapPin, MoveLeft } from "lucide-react";


function ProfilePage() {
    // eslint-disable-next-line prefer-const
    const [userData, setUserData] = useState<IProfileUserData>({
        aboutSelf: "", 
        avatar: "", 
        email: "", 
        firstName: "", 
        id: 0, 
        lastName: "", 
        location: "",
        events: []
    });

    useEffect(() =>{
        getProfileUserData().then(
            (response) =>{
                if (response != null){
                setUserData({
                    aboutSelf: response.aboutSelf,
                    avatar: response.avatar,
                    email: response.email,
                    firstName: response.firstName,
                    id: response.id,
                    lastName: response.lastName,
                    location: response.location,
                    events: response.events,
                });
                }

        })
    }, [])
    

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Кнопка назад */}
                <div className="flex">
                    <button 
                        onClick={handleBack}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 ml-2"
                    >
                        <MoveLeft/>
                        Назад
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {/* Аватарка */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="bg-gray-300 rounded-full h-36 w-36 flex items-center justify-center overflow-hidden mb-4">
                                   
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">{}</h2>
                                {`${userData.firstName} ${userData.lastName}`}
                            </div>

                            {/* Личные данные */}
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-600 gap-2">
                                    <Mail/>
                                    {userData.email}
                                </div>
                                
                                <div className="flex items-center text-gray-600 gap-2">
                                    <MapPin/>
                                    {userData.location}
                                </div>
                            </div>

                            {/* Биография */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">О себе</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {userData.aboutSelf}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Блок со списком ивентов */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Мои точки</h2>
                                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {userData.events.length} количество точек
                                </span>
                            </div>

                            {/* Список ивентов */}
                            <div className="space-y-4">
                                {userData.events && (
                                    userData.events.map((e, i) =>{
                                        //TODO Поменять заглушку 
                                        return <Event key={e.id} coordinates={e.coordinates} type={""} timestomp={e.timestomp}/>
                                    })
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;