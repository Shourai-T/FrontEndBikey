import React, { useEffect, useState } from 'react'
import MapboxMap from '../../components/MapboxMaps'
import { useSelector } from 'react-redux';
import { stations as stationData } from '../../data';
const AdminHome = () => {
    const [station, setStation] = useState<any>(null);

    useEffect(() => {
        if (stationData && stationData.length > 0) {
            const defaultStation = stationData.find((s) => s._id === 1);
            setStation(defaultStation);
        }
    }, []);
    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            {/* Mobile Header (chỉ hiển thị khi <768px) */}
            <div className="h-14 px-6 bg-white flex items-center md:hidden">
                <p>Xin chào, <strong>Nguyễn Văn A</strong></p>
            </div>

            {/* Desktop Sidebar (chỉ hiển thị khi ≥768px) */}
            <div className="hidden md:flex md:w-[300px] bg-white px-6 py-8">
                <div className="w-full">
                    <p className="text-lg">
                        Xin chào, <strong className="font-medium">Nguyễn Văn A</strong>
                    </p>
                    <hr className="mt-4 mb-8 border-black" />
                    <ul className="space-y-6 text-gray-600 flex flex-col items-center gap-3">
                        <li className="cursor-pointer hover:text-black transition-colors">
                            Quản lý trạm
                        </li>
                        <li className="cursor-pointer hover:text-black transition-colors">
                            Quản lý xe
                        </li>
                        <li className="cursor-pointer hover:text-black transition-colors">
                            Quản lý báo cáo
                        </li>
                    </ul>
                </div>
            </div>

                {/* Map section */}
                <div className="flex-1 relative">
                    <MapboxMap
                        latitude={station?.location[1]}
                        longitude={station?.location[0]}
                        stations={stationData}
                        isAdmin={true}
                    />
                </div>
            </div>
            )
}

            export default AdminHome