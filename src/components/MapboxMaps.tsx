import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import IconMarker from "../assets/IconMarker.png";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // Lấy token từ .env

interface MapboxMapProps {
  latitude?: number;
  longitude?: number;
}

const MapboxMap = ({ latitude, longitude }: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initMap = (lat: number, lng: number) => {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 14,
      });

      // Custom marker
      const markerEl = document.createElement("div");
      markerEl.style.backgroundImage = `url(${IconMarker})`;
      markerEl.style.width = "35px";
      markerEl.style.height = "35px";
      markerEl.style.backgroundSize = "cover";

      new mapboxgl.Marker(markerEl).setLngLat([lng, lat]).addTo(mapRef.current!);
    };

    if (latitude !== undefined && longitude !== undefined) {
      initMap(latitude, longitude);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat, lng });
          initMap(lat, lng);
        },
        (error) => {
          console.error("Lỗi lấy vị trí:", error);
          alert("Không thể lấy vị trí hiện tại. Vui lòng kiểm tra cài đặt định vị.");
        },
        { enableHighAccuracy: true }
      );
    }

    return () => mapRef.current?.remove();
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default MapboxMap;
