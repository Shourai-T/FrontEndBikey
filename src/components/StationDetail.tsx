import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { stations } from "../data";
import SearchInput from "../components/SearchInput";
import RideStatusCard from "./RideStatusCard";
import MapboxMap from "./MapboxMaps";
import SearchStation from "./SearchStation";

function StationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [station, setStation] = useState(() => stations.find((s) => s.id === Number(id)) || null);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [flyToUserLocation, setFlyToUserLocation] = useState<() => void>(() => () => {});


    useEffect(() => {
        if (!station) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Lỗi lấy vị trí:", error);
                    alert("Không thể lấy vị trí hiện tại. Vui lòng kiểm tra cài đặt định vị.");
                },
                { enableHighAccuracy: true }
            );
        }
    }, [station]);

    useEffect(() => {
        if (id) {
            const foundStation = stations.find((s) => s.id === Number(id));
            if (foundStation) {
                setStation(foundStation);
                setSearch(foundStation.name);
            }
        }
    }, [id]);

    return (
        <div className="relative w-[393px] h-[852px] mx-auto">
            {/* Ô tìm kiếm */}
            <div className="absolute top-10 left-0 w-full px-4 z-20">
                <SearchInput
                    value={search}
                    onChange={setSearch}
                    onSearch={() => setShowSearch(true)}
                    onKeyDown={() => setShowSearch(true)}
                    onFocus={() => setShowSearch(true)}
                />
            </div>

            {/* Hiển thị SearchStation khi nhấn vào ô tìm kiếm */}
            {showSearch && (
                <div className="absolute left-0 w-full h-full bg-white z-30">
                    <SearchStation setSearch={setSearch} setShowSearch={setShowSearch} />
                    <button className="absolute top-4 right-4 text-gray-600 text-lg" onClick={() => setShowSearch(false)}>
                        ✕
                    </button>
                </div>
            )}

            {/* Bản đồ Mapbox */}
            {/* {station ? (
                <MapboxMap latitude={station.latitude} longitude={station.longitude} />
            ) : userLocation ? (
                <MapboxMap latitude={userLocation.latitude} longitude={userLocation.longitude} />
            ) : (
                <p className="text-red-500 text-center mt-4">Không thể lấy vị trí.</p>
            )} */}

            {/* Bản đồ Mapbox - Hiển thị tất cả các trạm */}
            <MapboxMap latitude={station?.latitude} longitude={station?.longitude}/>

            {/* Component RideStatusCard */}
            <RideStatusCard
                rideId="123xyx-bjfbej"
                status="đang di chuyển"
                duration="5p12s"
                onReturn={() => console.log("Trả xe")}
                onReport={() => console.log("Báo xe hỏng")} 
            />
        </div>
    );
}

export default StationDetail;
