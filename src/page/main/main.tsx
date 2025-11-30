import React, {useState, useRef, useEffect } from 'react';
import { Map, Placemark, SearchControl, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import Dot from '../../components/dot/dot'
import { useNavigate } from 'react-router-dom';
import addMark from '../../assets/main/addMark.svg'
import chat from '../../assets/main/chat.svg'
import notification from '../../assets/main/notification.svg'
import profile from '../../assets/main/profile.svg'
import type { IEventRequest } from '../../model/eventRequest';
import { getAllEvents, saveEvents } from '../../services/eventService';
import type { IJwtResponse } from '../../model/jwtResponse';
import { jwtDecode } from 'jwt-decode';
import type { IEventResponse } from '../../model/eventResponse';
import type {} from '@yandex/ymaps3-types';


    
const API_KEY = import.meta.env.VITE_YANDEX_API_KEY;
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


function MainPage() {
    const [showAddMarkPopup, setShowAddMarkPopup] = useState<boolean>(false);
    const [allEvents, setAllEvevnts] = useState<Array<IEventResponse>>();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [description, setDescription] = useState<string>('');
    const [coordinates, setCoordinates] = useState<number[]>([]);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userId = getUserId();
    const navigate = useNavigate();

    useEffect(() =>{
        getAllEvents().then((response) => {
            if (response)
            setAllEvevnts(response);
        })

    },[])

    function palcemarkSet (e) {
        const coords = e.get("coords")
        
        if(coords){
            console.log(coords)
            setCoordinates(coords)
        }
    }

    const profileNav = () => {
        navigate(`/profile`);
    }

    const chatNav = () =>{
        navigate("/chats");
    }

    const handleAddMarkClick = () => {
        setShowAddMarkPopup(true);
    };



    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        console.log(files)
        if (files) {
            const newImages = Array.from(files);
            setSelectedImages(prev => [...prev, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const formData = new FormData()
        if(fileInputRef.current?.files){
            const eventRequest: IEventRequest = {
                coordinates: coordinates || [0,0],
                description: description,
                userId: userId?.id || 0,

            }
            Array.from(fileInputRef.current?.files).forEach((file) => {
                formData.append('file', file);
            })
                    
            if (eventRequest) {
                await saveEvents(eventRequest, formData);
                getAllEvents();
            }
        }

        setSelectedImages([]);
        setDescription('');
        setShowAddMarkPopup(false);
    };

    const handleClosePopup = () => {
        setSelectedImages([]);
        setDescription('');
        setShowAddMarkPopup(false);
    };



    return (
        <div className='h-screen w-screen'>
            
            <YMaps query={{apikey: API_KEY}}>
                <Map onClick = {(e) => {palcemarkSet(e)}} defaultState={{ center:[51.660985, 39.200079], zoom: 12, controls: []}} style={{ width: '100%', height: '100%' }}>
                <ZoomControl options={{size: "small", position:{top: window.screen.availHeight*0.45, right: 15}}}/>
               
                {coordinates && (<Placemark geometry={coordinates}/>)}
                {allEvents && allEvents.map((e) => {
                    return <Placemark geometry={e.coordinates}/>
                })
                }
               </Map>
            </YMaps>

            <div className='fixed top-5 right-6'>
                <div className='flex gap-2.5 '>
                    <Dot svg={notification}/>
                    <Dot svg={chat} onClick={chatNav}/>
                    <Dot svg={addMark} onClick={handleAddMarkClick}/>
                    <Dot svg={profile} onClick={profileNav}/>
                </div>
            </div>

            {/* Всплывающее окно добавления метки */}
            {showAddMarkPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        {/* Заголовок */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">Добавить метку</h2>
                            <button
                                onClick={handleClosePopup}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Контент */}
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
                            {/* Загрузка фото */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Фотографии ({selectedImages.length}/10)
                                </label>
                                
                                {/* Превью выбранных фото */}
                                {selectedImages.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        {selectedImages.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Кнопка загрузки */}
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                >
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-600 mb-2">Нажмите для загрузки фото</p>
                                    <p className="text-sm text-gray-500">Можно выбрать несколько файлов</p>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    className="hidden"
                                />
                            </div>

                            {/* Описание */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Описание метки
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Расскажите о этом месте..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={handleClosePopup}
                                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors font-medium"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                Добавить метку
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainPage;