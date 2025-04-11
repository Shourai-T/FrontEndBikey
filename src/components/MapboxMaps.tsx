import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import IconMarker from "../assets/IconMarker.png";
import CloseIcon from "../assets/IconClose.png"
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import UserLocationMarker from "./UserLocationMarker";
import CustomMarker from "./MarkerCustom";
import PopupContent from "./PopupContent";
import LoadingScreen from "./LoadingScreen";
import MapboxPopupContainer from "./MapboxPopupContainer"; // ✅ Import Portal wrapper

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapboxMapProps {
  latitude?: number;
  longitude?: number;
  stations: any[];
  isAdmin?: boolean;
}

const MapboxMap = ({ latitude, longitude, stations, isAdmin = false }: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isUserLocationSet, setIsUserLocationSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    setIsLoading(true);

    const defaultLat = latitude ?? currentLocation?.lat ?? 10.776889;
    const defaultLng = longitude ?? currentLocation?.lng ?? 106.700987;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [defaultLng, defaultLat],
      zoom: 14,
    });

    const map = mapRef.current;

    map.on("load", () => {
      setIsLoading(false);

      setTimeout(() => {
        map.resize();
      }, 200);
    });

    stations.forEach((station) => {
      const markerEl = document.createElement("div");
      const popupContainer = document.createElement("div");

      const markerRoot = createRoot(markerEl);
      markerRoot.render(<CustomMarker bikeCount={station.count} />);

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
        className: "custom-popup"
      }).setDOMContent(popupContainer);

      new mapboxgl.Marker(markerEl)
        .setLngLat([station.location[0], station.location[1]])
        .setPopup(popup)
        .addTo(map);

      // markerEl.addEventListener("mouseenter", () => {
      //   popup.addTo(map);
      // });

      const popupRoot = createRoot(popupContainer);
      popupRoot.render(
        <MapboxPopupContainer container={popupContainer}>
          <PopupContent
            name={station.name}
            address={station.address}
            bikeCount={station.count}
            stationId={station._id}
            lat={station.location[1]} // Vĩ độ
            lng={station.location[0]} // Kinh độ
            isAdmin={isAdmin}
          />
        </MapboxPopupContainer>
      );
    });

    // Marker vị trí người dùng
    if (currentLocation) {
      const markerEl = document.createElement("div");
      const root = createRoot(markerEl);
      root.render(<UserLocationMarker lat={currentLocation.lat} lng={currentLocation.lng} />);

      new mapboxgl.Marker(markerEl)
        .setLngLat([currentLocation.lng, currentLocation.lat])
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

        const markerEl = document.createElement("div");
        const root = createRoot(markerEl);
        root.render(<UserLocationMarker lat={lat} lng={lng} />);

        new mapboxgl.Marker(markerEl).setLngLat([lng, lat]).addTo(map);

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
      {isLoading && <LoadingScreen />}
      <div ref={mapContainerRef} className={`absolute w-full h-full ${isLoading ? "hidden" : ""}`} />
      <button>
        <img
          src={CloseIcon}
          alt="Close"
          className="absolute top-2 right-2 w-6 h-6"
          onClick={() => navigate(-1)}
        />
      </button>
    </div>
  );
};

export default MapboxMap;
