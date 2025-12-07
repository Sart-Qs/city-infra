import { Calendar, Clock3, MapPin } from "lucide-react"

interface IEvent{
    coordinates: Array<number>,
    type: string,
    timestomp: Date,
}

export const  Event: React.FC<IEvent> = ({
    coordinates,
    type,
    timestomp
}) => {

    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {type}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center">
                            <Calendar size={16}/>
                            {}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock3 size={16}/>
                            {timestomp.toString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16}/>
                            {coordinates.map((e) =>{
                                return e + " "
                            })}
                        </div>
                        <div className="flex items-center">
                            {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.type === 'конференция' ? 'bg-purple-100 text-purple-800' :
                                    event.type === 'митап' ? 'bg-green-100 text-green-800' :
                                        'bg-orange-100 text-orange-800'
                                }`}>
                                {}
                            </span> */}
                        </div>
                    </div>
                </div>
                <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Подробнее
                </button>
            </div>
        </div>
    )
}