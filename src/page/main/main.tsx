import React, {useState, useRef, useEffect, useCallback } from 'react';
import Dot from '../../components/dot/dot'
import { useNavigate } from 'react-router-dom';
import type { IEventRequest } from '../../model/eventRequest';
import { getAllEvents, saveEvents } from '../../services/eventService';
import type { IJwtResponse } from '../../model/jwtResponse';
import { jwtDecode } from 'jwt-decode';
import type { IEventResponse } from '../../model/eventResponse';
import {YMap, YMapControls, YMapDefaultFeaturesLayer, YMapDefaultMarker, YMapDefaultSchemeLayer, YMapFeature, YMapListener, YMapZoomControl, } from '../../lib/ymaps';
import type {YMapCameraRequest, YMapCenterZoomLocation, YMapLocationRequest} from '@yandex/ymaps3-types'
import { YMapMarkerPopUp } from '../../components/ballonPopUp/ballonPopUp';
import { Image, X } from 'lucide-react';
import type {MapEventUpdateHandler} from '@yandex/ymaps3-types'

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

//TODO сделать что при открытом popup нельзя было двойным кликом приближать

interface IGeoObject{
    type: string,
    entity?: any,
    source: string,
    layer: string
}

function MainPage() {
    const startLocation: YMapCenterZoomLocation = {
        center: [39.200296, 51.660781],
        zoom: 12
    }
    const startCamera: YMapCameraRequest = {
        azimuth: 0,
        tilt: 0,
    }
    const [mapState, setMapState] = useState<{location: YMapLocationRequest; camera: YMapCameraRequest}>({
        location: startLocation,
        camera: startCamera
    });

    const [showAddMarkPopup, setShowAddMarkPopup] = useState<boolean>(false);
    const [inRadius, setInRadius] = useState<boolean>(false);
    const [allEvents, setAllEvevnts] = useState<Array<IEventResponse>>();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [description, setDescription] = useState<string>('');
    const [coord, setCoordinates] = useState<number[] | null>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const userId = getUserId();
    const navigate = useNavigate();


    useEffect(() =>{
        getAllEvents().then((response) => {
            if (response)
            setAllEvevnts(response);
        })
    },[])


    function palcemarkSet (e: number[], object?: IGeoObject) {
        if(e){
            setCoordinates(e);
            if(object?.type == "feature"){
                setInRadius(true);
            }else{
                setInRadius(false);
            }
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

        if(inRadius && !confirm("Рядом есть ещё одна точка")){
            console.log("net");
            return;
        }

        if(fileInputRef.current?.files){
            const eventRequest: IEventRequest = {
                coordinates: coord || [0,0],
                description: description,
                userId: userId?.id || 0,

            }
            Array.from(fileInputRef.current?.files).forEach((file) => {
                formData.append('file', file);
            })
            
            if (eventRequest) {
                await saveEvents(eventRequest, formData);
                getAllEvents().then((response) =>{
                    setAllEvevnts(response);
                });
            }
        }
        setCoordinates(null);
        setSelectedImages([]);
        setDescription('');
        setShowAddMarkPopup(false);
    };

    const changeZoomAndLocation: MapEventUpdateHandler  = useCallback(({camera, location})=>{
        setMapState(prev => {
            prev.location = location
            prev.camera = camera;
            return prev;
        })
    },[]);

    const handleClosePopup = () => {
        setSelectedImages([]);
        setDescription('');
        setShowAddMarkPopup(false);
    };

    return (
        <div className='h-screen w-screen'>

            <YMap location={mapState.location} propagateEvents={true}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                {allEvents && allEvents.map((element, i) =>{
                    console.log(element.fileUrl);
                    return <YMapMarkerPopUp key={element.id} coords={element.coordinates} images={element.fileUrl} likes={2} user={element.user} description={element.description}/>
                })}
                {coord && (<YMapDefaultMarker coordinates={coord} size={"normal"}/>)}
                

                <YMapListener
                    onClick={(object: IGeoObject, event: {coordinates: number[], screenCoordinates: number[]}) => {object && (object.type != "feature" && object.type != "hotspot") ? console.log(object) : palcemarkSet(event.coordinates, object)}}
                    onUpdate={changeZoomAndLocation}
                 />

                <YMapControls  position="right">
                    <YMapZoomControl />
                </YMapControls>
            </YMap>
            
            <div className='fixed top-5 right-6' id='2'>
                <div className='flex gap-2.5 '>
                    <Dot type='notification'/>
                    <Dot type="chat" onClick={chatNav}/>
                    <Dot type='mark' onClick={handleAddMarkClick}/>
                    <Dot type='profile' onClick={profileNav}/>
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
                                <X/>
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
                                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                                    <div className="flex justify-center mb-2">
                                        <Image size={60} />
                                    </div>
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