import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { stations } from "../data";
import SearchInput from "../components/SearchInput";
import RideStatusCard from "./RideStatusCard";
import MapboxMap from "./MapboxMaps";
import SearchStation from "./SearchStation";
import { useDispatch, useSelector } from "react-redux";
import {
  checkHaveRentalOnGoing,
  returnRental,
} from "../redux/api_request/rental_api";

function StationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [duration, setDuration] = useState(0);
  const [station, setStation] = useState(
    () => stations.find((s) => s.id === Number(id)) || null
  );
  const rental = useSelector((state: any) => state.rental.getRentalDetail.data);
  const loadingRental = useSelector(
    (state: any) => state.rental.getRentalDetail.isFetching
  );
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    checkHaveRentalOnGoing(dispatch);
  }, []);

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
          alert(
            "Không thể lấy vị trí hiện tại. Vui lòng kiểm tra cài đặt định vị."
          );
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 } // timeout 10s, cache 5s
      );
    }
  }, [station]);

  useEffect(() => {
    if (rental) {
      const updateDuration = () => {
        const startTime = new Date(rental.startTime);
        const now = new Date();
        setDuration(
          Math.floor((Number(now) - Number(startTime)) / (1000 * 60))
        );
      };

      updateDuration(); // Cập nhật ngay khi rental có dữ liệu
      const interval = setInterval(updateDuration, 60000); // Cập nhật mỗi 60s

      return () => clearInterval(interval);
    }
  }, [rental]);

  useEffect(() => {
    if (id) {
      const foundStation = stations.find((s) => s.id === Number(id));
      if (foundStation) {
        setStation(foundStation);
        setSearch(foundStation.name);
      }
    }
  }, [id]);

  const returnBike = () => {
    if (!userLocation) {
      alert("Không thể lấy vị trí hiện tại. Vui lòng thử lại.");
      return;
    }
    returnRental(
      rental._id,
      userLocation!.latitude,
      userLocation!.longitude,
      dispatch,
      navigate
    );
  };
  console.log("StationDetail", userLocation);
  if (!station && !userLocation) {
    return <p>Đang tải...</p>;
  }
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
          <button
            className="absolute top-4 right-4 text-gray-600 text-lg"
            onClick={() => setShowSearch(false)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Bản đồ Mapbox */}
      {station ? (
        <MapboxMap latitude={station.latitude} longitude={station.longitude} />
      ) : userLocation ? (
        <MapboxMap
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        />
      ) : (
        <p className="text-red-500 text-center mt-4">Không thể lấy vị trí.</p>
      )}

      {/* Component RideStatusCard */}
      {rental && (
        <RideStatusCard
          rideId={rental.bikeId.bikeCode}
          status="đang được sử dụng"
          duration={`${duration} phút`}
          onReturn={returnBike}
          onReport={() => console.log("Báo xe hỏng")}
        />
      )}
    </div>
  );
}

export default StationDetail;
