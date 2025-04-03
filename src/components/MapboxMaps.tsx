import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import IconMarker from "../assets/IconMarker.png";
import { getListStationsSort } from "../redux/api_request/station_api";
import LoadingScreen from "./LoadingScreen";
import closeIcon from "../assets/IconClose.png"
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // Lấy token từ .env

interface MapboxMapProps {
  latitude?: number;
  longitude?: number;
  stations: any[];
}

const MapboxMap = ({ latitude, longitude, stations }: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isUserLocationSet, setIsUserLocationSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ Thêm state loading'
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    setIsLoading(true); // ✅ Bắt đầu loading khi tạo map

    const defaultLat = latitude ?? currentLocation?.lat ?? 10.776889; // Hồ Chí Minh mặc định
    const defaultLng = longitude ?? currentLocation?.lng ?? 106.700987;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [defaultLng, defaultLat],
      zoom: 14,
    });

    const map = mapRef.current as mapboxgl.Map;

    // ✅ Xử lý sự kiện tải xong bản đồ
    map.on("load", () => {
      setIsLoading(false); // Khi map load xong, tắt loading
    });

    // Thêm marker cho tất cả station
    stations.forEach((station) => {
      const markerEl = document.createElement("div");
      markerEl.style.backgroundImage = `url(${IconMarker})`;
      markerEl.style.width = "35px";
      markerEl.style.height = "35px";
      markerEl.style.backgroundSize = "cover";

      new mapboxgl.Marker(markerEl)
        .setLngLat([station.location[0], station.location[1]])
        .setPopup(
          new mapboxgl.Popup().setHTML(`<h3 style ="font-weight: bold">${station.name}</h3><p style="font-size: 12px">${station.address}</p>`)
        )
        .addTo(map);
    });

    // Thêm marker vị trí hiện tại của người dùng nếu có
    if (currentLocation) {
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML("<h3>Vị trí của bạn</h3>"))
        .addTo(map);
    }

    return () => map.remove();
  }, [latitude, longitude, currentLocation]);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });
        setIsUserLocationSet(true);

        const map = mapRef.current as mapboxgl.Map;

        new mapboxgl.Marker({ color: "blue" })
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML("<h3>Vị trí của bạn</h3>"))
          .addTo(map);

        if (!latitude && !longitude) {
          map.flyTo({ center: [lng, lat], zoom: 14 });
        }
      },
      (error) => {
        console.error("Lỗi lấy vị trí:", error);
      },
      { enableHighAccuracy: true }
    );
  }, [isUserLocationSet]);

  return (
    <div className="relative w-full h-full">
      {isLoading && <LoadingScreen />} {/* ✅ Hiển thị màn hình loading */}
      <div ref={mapContainerRef} className={`absolute top-0 left-0 w-full h-full ${isLoading ? "hidden" : ""}`} />
      <button>
        <img src={closeIcon} alt="Close" className="absolute top-2 right-2 w-6 h-6" onClick={() =>navigate(-1)} />
      </button>
    </div>
  );
};

export default MapboxMap;
