import React from "react";

interface UserLocationMarkerProps {
  lat: number;
  lng: number;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = () => {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <div className="absolute w-8 h-8 bg-red-500 opacity-70 rounded-full animate-ping"></div>
      <div className="absolute w-6 h-6 bg-red-500 opacity-80 rounded-full animate-ping delay-200"></div>
      <div className="absolute w-4 h-4 bg-red-500 opacity-90 rounded-full animate-ping delay-400"></div>
    </div>
  );
};

export default UserLocationMarker;
