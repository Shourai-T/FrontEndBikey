import React, { useEffect, useState } from 'react'
import MapboxMap from '../../components/MapboxMaps'
import { useSelector } from 'react-redux';
import { stations as stationData } from '../../data';
import QRIcon from "../../assets/Qr_scanner.png"
import { vehicleData, reportsData } from "../../data/Admin"
import PopupQR from '../../components/PopupQR';
import QRImage from "../../assets/QrDemo.png"
import { Dropdown } from '../../components/Dropdown';

type Section = 'stations' | 'vehicles' | 'reports';

const AdminHome = () => {
    const [station, setStation] = useState<any>(null);
    const [activeSection, setActiveSection] = useState<Section>('stations');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedReportLocation, setSelectedReportLocation] = useState<[number, number] | undefined>(undefined);
    const [showMap, setShowMap] = useState(false);
    const options = [
        'Tất cả báo cáo trong ngày',
        'Tất cả báo cáo',
        'Báo cáo chưa được xử lý ngày hôm nay'
    ];

    useEffect(() => {
        if (stationData && stationData.length > 0) {
            const defaultStation = stationData.find((s) => s._id === 1);
            setStation(defaultStation);
        }
    }, []);

    const ReportMap = () => {
        return (
            <MapboxMap
                latitude={station?.location[1]}
                longitude={station?.location[0]}
                stations={stationData}
                isAdmin={true}
                reportLocation={selectedReportLocation}
            />
        )
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'stations':
                return (
                    <div className='flex-1 relative'>
                        <MapboxMap
                            latitude={station?.location[1]}
                            longitude={station?.location[0]}
                            stations={stationData}
                            isAdmin={true}
                        // reportLocation={selectedReportLocation}
                        />
                    </div>
                );
            case 'vehicles':
                return (
                    <div className="flex-1 p-16">
                        <div className="bg-white shadow-[0_0_10px_2px_#00000040]">
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="border-b border-black">
                                        <th className="text-xl text-center py-4 px-4 font-semibold">Mã xe</th>
                                        <th className="text-xl text-center py-4 px-4 font-semibold">Trạng thái</th>
                                        <th className="text-xl text-center py-4 px-4 font-semibold">Trạm hiện tại</th>
                                        <th className="text-xl text-center py-4 px-4 font-semibold">QRCode</th>
                                    </tr>
                                </thead>
                            </table>

                            {/* tbody */}
                            <div className="max-h-[520px] overflow-y-auto">
                                <table className="w-full table-fixed">
                                    <tbody>
                                        {vehicleData.map((vehicle) => (
                                            <tr key={vehicle.id} className="">
                                                <td className="text-lg py-4 px-4 text-center">{vehicle.id}</td>
                                                <td className="text-lg py-4 px-4 text-center">{vehicle.status}</td>
                                                <td className="text-lg py-4 px-4 text-center">{vehicle.station}</td>
                                                <td className="text-lg py-4 px-4 flex justify-center">
                                                    <button
                                                        className="px-4 py-1.5 border border-[#102590] text-[#102590] rounded-full text-sm flex items-center gap-2"
                                                        onClick={() => setShowPopup(true)}
                                                    >
                                                        <img src={QRIcon} alt="Icon Qr" className="w-5" />
                                                        In mã QR
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                );
            case 'reports':
                return (
                    <div className={`flex-1 ${showMap ? 'relative' : 'p-16'}`}>
                        <div className={`${showMap ? 'hidden' : ''}`}>
                            <div className="flex items-center justify-end pb-8">
                                <Dropdown
                                    options={options}
                                    defaultValue={options[0]}
                                />
                            </div>
                            <div className="bg-white shadow-[0_0_10px_2px_#00000040]">
                                <table className="w-full table-fixed">
                                    <thead>
                                        <tr className="border-b border-black">
                                            <th className="text-xl text-center py-4 px-4 font-semibold">Người báo cáo</th>
                                            <th className="text-xl text-center py-4 px-4 font-semibold">Mã xe</th>
                                            <th className="text-xl text-center py-4 px-4 font-semibold">Địa điểm báo cáo</th>
                                            <th className="text-xl text-center py-4 px-4 font-semibold">Thời gian báo cáo</th>
                                        </tr>
                                    </thead>
                                </table>

                                {/* tbody */}
                                <div className="max-h-[520px] overflow-y-auto">
                                    <table className="w-full table-fixed">
                                        <tbody>
                                            {reportsData.map((report, index) => (
                                                <tr key={index} className="">
                                                    <td className="text-lg py-4 px-4 text-center">{report.name}</td>
                                                    <td className="text-lg py-4 px-4 text-center">{report.id}</td>
                                                    <td className="text-lg py-4 px-4 text-center">
                                                        <a
                                                            href="#"
                                                            className="underline"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setSelectedReportLocation(report.location as [number, number]);
                                                                setShowMap(true); // Chuyển sang tab bản đồ
                                                            }}
                                                        >
                                                            Xem vị trí
                                                        </a>

                                                    </td>
                                                    <td className="text-lg py-4 px-4 flex justify-center">{report.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {showMap && <ReportMap />}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="w-full h-screen flex flex-col md:flex-row">
            {/* Mobile Header (chỉ hiển thị khi <768px) */}
            <div className="h-14 px-6 bg-white flex items-center md:hidden">
                <p>Xin chào, <strong>Nguyễn Văn A</strong></p>
            </div>

            {/* Desktop Sidebar (chỉ hiển thị khi ≥768px) */}
            <div className="hidden z-20 md:flex md:w-[300px] bg-white px-6 py-8 shadow-[0_2px_10px_1px_#00000040]">
                <div className="w-full">
                    <p className="text-lg">
                        Xin chào, <strong className="font-medium">Nguyễn Văn A</strong>
                    </p>
                    <hr className="mt-4 mb-8 border-black" />
                    <ul className="space-y-6 text-gray-600 flex flex-col items-center gap-3">
                        <li
                            className={`cursor-pointer hover:text-black transition-colors w-full text-center py-2 rounded-lg ${activeSection === 'stations' ? 'underline' : ''}`}
                            onClick={() => {
                                setActiveSection('stations');
                                setShowMap(false);
                            }}
                        >
                            Quản lý trạm
                        </li>
                        <li
                            className={`cursor-pointer hover:text-black transition-colors w-full text-center py-2 rounded-lg ${activeSection === 'vehicles' ? 'underline' : ''}`}
                            onClick={() => {
                                setActiveSection('vehicles');
                                setShowMap(false);
                            }}
                        >
                            Quản lý xe
                        </li>
                        <li
                            className={`cursor-pointer hover:text-black transition-colors w-full text-center py-2 rounded-lg ${activeSection === 'reports' ? 'underline' : ''}`}
                            onClick={() => {
                                setActiveSection('reports');
                                setShowMap(false);
                            }}
                        >
                            Quản lý báo cáo
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section */}
            {renderContent()}

            {/* QR Popup */}
            {showPopup && (
                <PopupQR
                    qrImage={QRImage}
                    onClose={() => setShowPopup(false)}
                />
            )}

        </div>
    )
}

export default AdminHome